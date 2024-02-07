// 声明插件
const MyPlugin = {
  install(Vue, options) {
    // 比方说这里有个组件库，那么我写好之后都放到这里，别人只需要安装这个插件就可以使用所有的组件了，非常的方便
    Vue.component('heading', {
      props: {
        level: {
          type: Number,
          require: true,
        },
        icon: {
          type: String,
        },
      },
      render(h) {
        const children = [];
        children.push(
          h(
            'svg',
            {
              class: 'icon',
            },
            [
              h('use', {
                attrs: {
                  'xlink:href': `#icon-${this.icon}`,
                },
              }),
            ]
          )
        );
        const VNode = h(
          'h' + this.level,
          { attrs: { title: this.title } }, // 第二个参数会放到 VNode 的 data 属性中
          [...children, ...this.$slots.default]
        );
        console.log('我是插件里的 heading');
        console.log(VNode);
        return VNode;
      },
    });
  },
};

// 浏览器环境，自动注册插件
// if (typeof window !== 'undefined' && window.Vue) {
//   // 使用插件
//   window.Vue.use(MyPlugin);
// }
