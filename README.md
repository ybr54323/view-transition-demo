# 基于react-router-dom, view transition 实现路由切换过渡动效

## 背景

在我之前的文章提到，用了 `framer-motion` 这个包来实现了路由切换时的过渡动效。

[关于用 framer-motion来实现路由切换动效的文章](https://juejin.cn/post/7414731989792686120)

其中一个 hack 写法用于实现前路由离开时的动效，大概是这样的

```jsx
export const AnimatedOutlet = ({ OutletContext } = {}) => {
    const location = useLocation();
    const element = useOutlet(OutletContext);
    return (
        <AnimatePresence
            mode="wait"
            initial={true}
        >
            {element && React.cloneElement(element, { key: location.pathname })}
        </AnimatePresence>
    );
};
```

但是这个写法会导致一些副作用，例如，会导致我封装好的 table 组件里面的 hook 执行两次，猜测是在framer-motion库对路由切换时，会克隆一个前路由组件，再对其添加离开动效所导致的。

好的点是：

- 动效流畅；
- 兼容性好；

不好的点是：

- 代码稍显复杂，其他同事难以维护；
- 当存在a-b-c三级嵌套路由时，想往某个层级里添加过渡动效，都要往该层级嵌套`AnimatePresence`, `motion.div`，稍显麻烦。

虽说可以通过一些方式来避免这个副作用，但还是有点麻烦，于是在寻找替代方案。

## 解决方案

最近发现一个浏览器的特性 view-transition，可以轻松地给组件增加动效，而且基本只需要写 css 就行（**并且也要给 react-router-dom 的Link配置viewTransition属性为 true**）。于是我用这个特性来替换掉 frame-motion。

## demo

具体可看预览效果以及代码

[https://view-transition-demo.yangbingrui.info/](https://view-transition-demo.yangbingrui.info/)

![Static Badge](https://img.shields.io/github/stars/ybr54323/view-transition-demo?style=social)

## 一些细节

注意这个 css 写法，其中的关键就是这几行，`::view-transition-old` 代表的是切换时，浏览器当前帧的节点离开时的
动效声明，`::view-transition-new` 代表的是浏览器下一帧新的节点进入时的动效声明，`b-page-transition`是对应节点的
`view-transition-name`。

```css
::view-transition-old(b-page-transition) {
  animation: var(--b-page-transition-duration) ease-in-out both
    b-page-transition-fade-out;
}

::view-transition-new(b-page-transition) {
  animation: var(--b-page-transition-duration) var(--b-page-transition-duration)
    ease-in-out both b-page-transition-fade-in;
}
```

注意这个写法：

```css
.b-page:has(.c-page) {
  view-transition-name: none;
  animation: none;
}
```

之所以这样写，是因为切换 3 级路由时，不希望再触发 2 级路由的切换动效了，如果不这样写的话，那么切换时，2 、3 级的过渡动效都会被触发。

还有一个点，这里之所以不把 c-page 放到 3 级页面那一层级，之所以这样写，是为了避免首次从 2 级跳到 3 级路由时页面轻微的跳动。跳动的原因，我猜测是切换时
同时触发 2,3 级路由的动效，但又命中上面那条 css 规则所导致的吧。

```jsx
const BPage = () => {
    //...
      <div className="c-page">
        <Outlet />
      </div>
    //...
};
```

## 总结

于是我用了 `view-transition` 来代替了 `framer-motion` 来实现路由切换时的动效，效果还可以，还加上了之前不好
实现的 2 级路由切换动效，因为实际通过 `framer-motion` 来实现动效，要额外增加嵌套的层级深度。而使用了 `view transition`
这个特性，增加切换动效变得简单得多了。
