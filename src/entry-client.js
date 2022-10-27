import { createApp } from './app';

const { app, router, store } = createApp();

// 只为了保证解析完异步组件后再挂载
router.onReady(() => {
  // 添加路由钩子函数，用于处理 asyncData.
  // 在初始路由 resolve 后执行，
  // 以便我们不会二次预取(double-fetch)已有的数据。
  // 使用 `router.beforeResolve()`，以便确保所有异步组件都 resolve。
  // wk 这里处理的逻辑是，前端路由跳转后到达的页面定义的asyncData需要调用，（第一次请求时是在服务端调用的，其他的页面只能客户端调用了）
  router.beforeResolve((to, from, next) => {
    const matched = router.getMatchedComponents(to);
    const prevMatched = router.getMatchedComponents(from);

    let diffed = false;
    // 我们只关心非预渲染的组件
    // 所以我们对比它们，找出两个匹配列表的差异组件
    const activated = matched.filter((c, i) => {
      // eslint-disable-next-line no-return-assign
      return diffed || (diffed = prevMatched[i] !== c);
    });

    if (!activated.length) {
      return next();
    }

    // 这里如果有加载指示器 (loading indicator)，就触发

    Promise.all(activated.filter((c) => c.asyncData).map((c) => c.asyncData({ store, route: to })))
      .then(() => {
        // 停止加载指示器(loading indicator)

        next();
      })
      .catch(next);
  });

  app.$mount('#app');
});
if (window.__INITIAL_STATE__) {
  store.replaceState(window.__INITIAL_STATE__);
}
