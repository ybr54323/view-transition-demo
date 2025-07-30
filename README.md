# 基于react-router-dom, view transition 实现路由切换过渡动效

## 背景
之前用了 framer-motion 这个库来实现了路由切换时的过渡动效，其中一个 hack 写法用于实现前路由离开时的动效，大概是这样的
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
但是这个写法会导致一些副作用，例如会导致我封装好的 table 组件里面的 hook 执行两次，猜测是在framer-motion库对路由切换时，会克隆一个前路由组件，再对其添加离开动效所导致的。

好的点是：动效流畅；兼容性好
不好的电视：代码稍显复杂，其他同事难以维护；
当存在a-b-c三级嵌套路由时，想往某个层级里添加过渡动效，都要往该层级嵌套`AnimatePresence`, `motion.div`，稍显麻烦。

虽说可以通过一些方式来避免这个副作用，但还是有点麻烦，于是在寻找替代方案。

最近发现一个特性 view-transition，可以轻松地给组件增加动效，而且基本只需要写 css 就行。于是我用这个特性来替换掉 frame-motion。

具体可看预览效果以及代码

[https://view-transition-demo.yangbingrui.info/](https://view-transition-demo.yangbingrui.info/)

![Static Badge](https://img.shields.io/github/stars/ybr54323/view-transition-demo?style=social)

注意这个写法：
```css
.b-page:has(.c-page) {
  view-transition-name: none;
  animation: none;
}
```
之所以这样写，是因为切换 3 级路由时，不希望再触发 2 级路由的切换动效了，如果不这样写的话，那么切换时，2 、3 级的过渡动效都会被触发。

还有一个点，这里之所以不把 c-page 放到 3 级页面那一层级，之所以这样写，是为了避免首次从 2 级跳到 3 级路由时页面轻微的跳动。

```jsx
const BPage = () => {
    //...
      <div className="c-page">
        <Outlet />
      </div>
    //...
};
```

