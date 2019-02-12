const state = {
  useGlobalAxios: true
};

const mutations = {
  changeState(state, option) {
    state.useGlobalAxios = option;
    if (!option) {
      setTimeout(() => {
        state.useGlobalAxios = true;
      }, 300);
    }
  }
};

export default {
  state,
  mutations
};
