#stock-player
一个自定义查看股市行情的应用

#功能
1. 查看沪深A股个股行情
2. 自建板块
3. 查看板块内所有股票行情

#程序结构简述
1. 使用MongoDB来存储session（如果仅仅是存session，实际memcached或redis性能更好，我这正好因为电脑上搭了Mongo，所以就直接用了）
2. 数据库使用了Mysql（我就想用用Mysql，没必要都用MongoDB嘛~O(∩_∩)O）
3. 采用MVC架构模式
4. 图表的显示用了Highcharts的stock模块。感觉性能还行，但是图表不够好。
5. 数据的来源来自新浪财经提供的接口

#小结
这个应用其实功能很简陋，我写的目的并非真正做一个股市行情查看的应用，而是练习一下用Nodejs做全栈开发的基础架构的搭建。这个是我第一次做架构，做下来感觉获益颇多，对Nodejs全栈开发架构有了更多的理解。同时审视这个应用，感觉有太多可以改近的地方（其实太糙了，自己现在已经有些看不下去了==！）。我目前在为公司做一个前端技术文档系统，也是用的Nodejs做全栈开发，那个就已经有明显的提高了。所以说要想获得提高，还是要多动手去写写，多多实战，每次都会有进步。
