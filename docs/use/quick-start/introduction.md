`iStock Shell`是一款用于研究和学习的金融数据查询工具，设计理念围绕着`简单性、高效率、灵活性以及可定制性展开`。它为用户提供了一个统一的平台，通过简单的命令输入，即可查询并展示来自不同数据源的金融信息。技术上得益于其基于标准 `HTML`、`CSS` 和 `JavaScript` 的构建，`iStock Shell` 可以直接在浏览器上运行，无需安装任何额外软件。

::: danger 需要特别注意
目前iStock Shell还处于开发版，不免有很多不足之处，如有问题请及时反馈。
另外开发版不会考虑数据兼容性，存储在本地的数据可能随时会丢失。
:::

## 起源

`iStock Shell`的构想源自于我个人在一次查询金融数据的经历。使用市面上常见的金融查询工具，我花费大量时间仍旧无法找到所需数据，最终在一个地方政务网站上发现了该数据。
由于所需数据只有这个网站才有，需要时不得不去访问查询，这个过程既费时又繁琐，因此我萌生了一个想法：如果能有一个工具将这些散落在不同地方的数据集中起来，那么获取信息时就无需访问多个网站，大大提升查询效率。基于这个想法，`iStock Shell`应运而生。

## 命令交互的优势

### 效率高

- `快速访问`：命令行界面允许用户通过简短的命令直接访问复杂的功能，无需通过多层菜单导航。
- `快捷键支持`：用户可以利用快捷键快速执行命令，大大节省操作时间。

### 可定制

- `个性化`：用户可以根据个人喜好和需求定制命令，创建定制化的数据查询工具。
- `扩展性强`：支持用户根据自己的特定需求二次开发命令，极大地提升了适用范围。

### 可预测

- `一致的用户体验`：命令行界面的布局和操作逻辑相对固定，用户一旦熟悉，就能预测每个命令的结果。
- `易于自动化`：由于命令和输出的一致性，便于设置自动化脚本，实现批量处理任务。

### 易迭代

- `简化的界面`：命令行界面不需要考虑复杂的交互设计，迭代升级变得更加简单。
- `灵活适应变化`：在需求变更时，调整和添加新命令比修改图形界面要容易得多。

### 脚本和自动化<Badge type="warning" text="暂未支持" />

更容易扩展脚本编写和定时任务功能。

- `脚本编写`：用户可以根据自己的需求编写脚本，自动执行复杂的查询或数据处理任务。
- `定时任务`：支持指定时间运行命令或脚本，例如：股价涨到多少时，消息提醒。
  总的来说命令行界面特别适合需要高度定制查询和追求效率的专业用户。

## 数据源说明

`iStock Shell`的灵活性体现在对数据源的开放性和可定制性上。当前默认将[AKShare](https://akshare.akfamily.xyz/introduction.html)作为数据源，用户在开发命令时可以对接其他数据源，以满足个性化的数据需求。

::: info 关于AKShare
AKShare是基于 Python 的财经数据接口库，目的是实现对股票、期货、期权、基金、外汇、债券、指数、加密货币等金融产品的基本面数据、实时和历史行情数据、衍生数据从数据采集、数据清洗到数据落地的一套工具。
:::
