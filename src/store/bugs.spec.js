import MockAdapter from "axios-mock-adapter";
import axios from "axios";
import configureStore from "./configureStore";
import { addBug, resolveBug, loadBugs, getUnresolvedBugs } from "./bugs";

describe("bugsSlice", () => {
  let fakeAxios;
  let store;

  beforeEach(() => {
    fakeAxios = new MockAdapter(axios);
    store = configureStore();
  });

  const getBugsSlice = () => store.getState().entities.bugs;
  const createState = () => ({
    entities: {
      bugs: {
        list: [],
      },
    },
  });

  describe("addBug", () => {
    it("should handle the addBug action", async () => {
      const bug = { description: "a" };
      const saveBug = { ...bug, id: 1 };
      fakeAxios.onPost("/bugs").reply(200, saveBug);

      await store.dispatch(addBug(bug));

      expect(getBugsSlice().list).toContainEqual(saveBug);
    });

    it("should not add the bug to the store if it's not saved", async () => {
      const bug = { description: "a" };
      fakeAxios.onPost("/bugs").reply(500);

      await store.dispatch(addBug(bug));

      expect(getBugsSlice().list).toHaveLength(0);
    });
  });

  describe("resolveBug", () => {
    it("should handle resolveBug action", async () => {
      const savedBug = { id: 1, resolved: true };
      fakeAxios.onPatch("/bugs/1").reply(200, savedBug);
      fakeAxios.onPost("/bugs").reply(200, { id: 1 });
      await store.dispatch(addBug({}));

      await store.dispatch(resolveBug(1));

      expect(getBugsSlice().list[0].resolved).toBeTruthy();
    });

    it("should handle resolveBug action", async () => {
      fakeAxios.onPatch("/bugs/1").reply(500);
      fakeAxios.onPost("/bugs").reply(200, { id: 1 });
      await store.dispatch(addBug({}));

      await store.dispatch(resolveBug(1));

      expect(getBugsSlice().list[0].resolved).toBeFalsy();
    });
  });

  describe("loading bugs", () => {
    describe("if the bugs exist in the cache", () => {
      it("they should not be fetched from the server again", async () => {
        fakeAxios.onGet("/bugs").reply(200, [{ id: 1 }]);

        await store.dispatch(loadBugs());
        await store.dispatch(loadBugs());

        expect(fakeAxios.history.get.length).toEqual(1);
      });
    });

    describe("if the bugs don't exist in the cache", () => {
      it("they should be fetched from the server and put they to the server", async () => {
        fakeAxios.onGet("/bugs").reply(200, [{ id: 1 }]);

        await store.dispatch(loadBugs());

        expect(getBugsSlice().list).toHaveLength(1);
      });

      describe("loading indicator", () => {
        it("should be true while fetching the bugs", () => {
          fakeAxios.onGet("/bugs").reply(() => {
            expect(getBugsSlice().loading).toBeTruthy();
            return [200, [{ id: 1 }]];
          });
          store.dispatch(loadBugs());
        });

        it("should be false after the bugs are fetched", async () => {
          fakeAxios.onGet("/bugs").reply(200, [{ id: 1 }]);

          await store.dispatch(loadBugs());

          expect(getBugsSlice().loading).toBeFalsy();
        });

        it("should be false if the server return an error", async () => {
          fakeAxios.onGet("/bugs").reply(500);

          await store.dispatch(loadBugs());

          expect(getBugsSlice().loading).toBeFalsy();
        });
      });
    });
  });

  describe("getUnresolvedBugs", () => {
    it("should return the unresolved bugs", async () => {
      const state = createState();
      state.entities.bugs.list = [
        { id: 1 },
        { id: 2, resolved: true },
        { id: 3 },
      ];

      const result = getUnresolvedBugs(state);

      expect(result).toHaveLength(2);
    });
  });
});
