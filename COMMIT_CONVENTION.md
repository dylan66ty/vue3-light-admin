Git提交消息约定是一种规范化的方式，用于编写清晰的Git提交消息，以便更容易生成变更日志和跟踪项目的进展。以下是关于Git提交消息约定的详细信息：

### 简要总结：

Git提交消息必须匹配以下正则表达式：

``` js
/^(revert: )?(feat|fix|polish|docs|style|refactor|perf|test|workflow|ci|chore|types)(\(.+\))?: .{1,50}/
```

### 示例

在“Features”标题下显示，`compiler`子标题下：

```
feat(compiler): add 'comments' option
```

在“Bug Fixes”标题下显示，`v-model`子标题下，并附有到问题 #28 的链接：

```
fix(v-model): handle events on blur

close #28
```

在“Performance Improvements”标题下显示，并在“Breaking Changes”下附有破坏性变更的解释：

```
perf(core): improve vdom diffing by removing 'foo' option

BREAKING CHANGE: The 'foo' option has been removed.
```

如果提交是对先前提交的回退，它应该以 `revert: ` 开头，后面跟着被回退提交的标题。在正文中，应该写上：`This reverts commit <hash>.`，其中 `<hash>` 是被回退提交的SHA哈希值。

### 完整的消息格式

一个提交消息由**头部**（header）、**正文**（body）和**页脚**（footer）组成。头部是必需的，头部的范围是可选的。

```
<type>(<scope>): <subject>
<BLANK LINE>
<body>
<BLANK LINE>
<footer>
```

头部的**类型**是必需的，头部的**范围**是可选的。

### 回退

如果提交是对先前提交的回退，它应该以 `revert: ` 开头，后面跟着被回退提交的标题。在正文中，应该写上：`This reverts commit <hash>.`，其中 `<hash>` 是被回退提交的SHA哈希值。

### 类型

如果前缀是 `feat`、`fix` 或 `perf`，它将出现在变更日志中。但是，如果有任何[破坏性变更](#footer)，该提交将始终出现在变更日志中。

其他前缀取决于您的自由裁量权。建议的前缀包括 `docs`、`chore`、`style`、`refactor` 和 `test`，用于非变更日志相关的任务。

### 范围

范围可以是任何指定提交更改位置的内容。例如，`core`、`compiler`、`ssr`、`v-model`、`transition` 等等...

### 主题

主题包含对更改的简明描述：

- 使用命令式、现在时：使用 "change" 而不是 "changed" 或 "changes"
- 不要大写首字母
- 不要在末尾加句号（.）

### 正文

正如在**主题**中一样，使用命令式、现在时：使用 "change" 而不是 "changed" 或 "changes"。正文应包括更改的动机，并与以前的行为进行对比。

### 页脚

页脚应包含有关**破坏性变更**的任何信息，并且还是引用 GitHub 问题的地方，该提交**关闭**了这些问题。

**破坏性变更**应以单词 `BREAKING CHANGE:` 开头，后面跟一个空格或两个新行。然后使用提交消息的其余部分来描述破坏性变更的详细信息。