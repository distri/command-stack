(function(pkg) {
  // Expose a require for our package so scripts can access our modules
  window.require = Require.generateFor(pkg);
})({
  "version": "0.9.0",
  "source": {
    "README.md": {
      "path": "README.md",
      "mode": "100644",
      "content": "",
      "type": "blob"
    },
    "main.coffee.md": {
      "path": "main.coffee.md",
      "mode": "100644",
      "content": "Command Stack\n=============\n\nA simple stack based implementation of executable and undoable commands.\n\n    CommandStack = ->\n      stack = []\n      index = 0\n\n      execute: (command) ->\n        stack[index] = command\n        command.execute()\n\n        # Be sure to blast obsolete redos\n        stack.length = index += 1\n\n      undo: ->\n        if @canUndo()\n          index -= 1\n\n          command = stack[index]\n          command.undo()\n\n          return command\n\n      redo: ->\n        if @canRedo()\n          command = stack[index]\n          command.execute()\n\n          index += 1\n\n          return command\n\n      current: ->\n        stack[index-1]\n\n      canUndo: ->\n        index > 0\n\n      canRedo: ->\n        stack[index]?\n\n    module.exports = CommandStack\n",
      "type": "blob"
    },
    "package.json": {
      "path": "package.json",
      "mode": "100644",
      "content": "{\n  \"name\": \"commando\",\n  \"version\": \"0.9.0\",\n  \"description\": \"Simple Command Pattern\",\n  \"devDependencies\": {\n    \"coffee-script\": \"~1.6.3\",\n    \"mocha\": \"~1.12.0\",\n    \"uglify-js\": \"~2.3.6\"\n  },\n  \"repository\": {\n    \"type\": \"git\",\n    \"url\": \"https://github.com/STRd6/commando.git\"\n  },\n  \"files\": [\n    \"dist\"\n  ],\n  \"main\": \"dist/commando.js\"\n}\n",
      "type": "blob"
    },
    "pixie.cson": {
      "path": "pixie.cson",
      "mode": "100644",
      "content": "version: \"0.9.0\"\nremoteDependencies: [\n  \"http://strd6.github.io/require/v0.2.2.js\"\n]\n",
      "type": "blob"
    },
    "test/command_stack.coffee": {
      "path": "test/command_stack.coffee",
      "mode": "100644",
      "content": "CommandStack = require \"../main\"\n\nok = assert\nequals = assert.equal\n\ndescribe \"CommandStack\", ->\n  it \"undo on an empty stack returns undefined\", ->\n    commandStack = CommandStack()\n  \n    equals commandStack.undo(), undefined\n  \n  it \"redo on an empty stack returns undefined\", ->\n    commandStack = CommandStack()\n  \n    equals commandStack.redo(), undefined\n  \n  it \"executes commands\", ->\n    command =\n      execute: ->\n        ok true, \"command executed\"\n  \n    commandStack = CommandStack()\n  \n    commandStack.execute command\n  \n  it \"can undo\", ->\n    command =\n      execute: ->\n      undo: ->\n        ok true, \"command executed\"\n  \n    commandStack = CommandStack()\n    commandStack.execute command\n  \n    commandStack.undo()\n  \n  it \"can redo\", ->\n    command =\n      execute: ->\n        ok true, \"command executed\"\n      undo: ->\n  \n    commandStack = CommandStack()\n    commandStack.execute command\n  \n    commandStack.undo()\n    commandStack.redo()\n  \n  it \"executes redone command once on redo\", ->\n    command =\n      execute: ->\n        ok true, \"command executed\"\n      undo: ->\n  \n    commandStack = CommandStack()\n    commandStack.execute command\n  \n    commandStack.undo()\n    commandStack.redo()\n  \n    equals commandStack.redo(), undefined\n    equals commandStack.redo(), undefined\n  \n  it \"command is returned when undone\", ->\n    command =\n      execute: ->\n      undo: ->\n  \n    commandStack = CommandStack()\n    commandStack.execute command\n  \n    equals commandStack.undo(), command, \"Undone command is returned\"\n  \n  it \"command is returned when redone\", ->\n    command =\n      execute: ->\n      undo: ->\n  \n    commandStack = CommandStack()\n    commandStack.execute command\n    commandStack.undo()\n  \n    equals commandStack.redo(), command, \"Redone command is returned\"\n  \n  it \"cannot redo an obsolete future\", ->\n    Command = ->\n      execute: ->\n      undo: ->\n  \n    commandStack = CommandStack()\n    commandStack.execute Command()\n    commandStack.execute Command()\n  \n    commandStack.undo()\n    commandStack.undo()\n  \n    equals commandStack.canRedo(), true\n  \n    commandStack.execute Command()\n  \n    equals commandStack.canRedo(), false\n",
      "type": "blob"
    }
  },
  "distribution": {
    "main": {
      "path": "main",
      "content": "(function() {\n  var CommandStack;\n\n  CommandStack = function() {\n    var index, stack;\n    stack = [];\n    index = 0;\n    return {\n      execute: function(command) {\n        stack[index] = command;\n        command.execute();\n        return stack.length = index += 1;\n      },\n      undo: function() {\n        var command;\n        if (this.canUndo()) {\n          index -= 1;\n          command = stack[index];\n          command.undo();\n          return command;\n        }\n      },\n      redo: function() {\n        var command;\n        if (this.canRedo()) {\n          command = stack[index];\n          command.execute();\n          index += 1;\n          return command;\n        }\n      },\n      current: function() {\n        return stack[index - 1];\n      },\n      canUndo: function() {\n        return index > 0;\n      },\n      canRedo: function() {\n        return stack[index] != null;\n      }\n    };\n  };\n\n  module.exports = CommandStack;\n\n}).call(this);\n\n//# sourceURL=main.coffee",
      "type": "blob"
    },
    "package": {
      "path": "package",
      "content": "module.exports = {\"name\":\"commando\",\"version\":\"0.9.0\",\"description\":\"Simple Command Pattern\",\"devDependencies\":{\"coffee-script\":\"~1.6.3\",\"mocha\":\"~1.12.0\",\"uglify-js\":\"~2.3.6\"},\"repository\":{\"type\":\"git\",\"url\":\"https://github.com/STRd6/commando.git\"},\"files\":[\"dist\"],\"main\":\"dist/commando.js\"};",
      "type": "blob"
    },
    "pixie": {
      "path": "pixie",
      "content": "module.exports = {\"version\":\"0.9.0\",\"remoteDependencies\":[\"http://strd6.github.io/require/v0.2.2.js\"]};",
      "type": "blob"
    },
    "test/command_stack": {
      "path": "test/command_stack",
      "content": "(function() {\n  var CommandStack, equals, ok;\n\n  CommandStack = require(\"../main\");\n\n  ok = assert;\n\n  equals = assert.equal;\n\n  describe(\"CommandStack\", function() {\n    it(\"undo on an empty stack returns undefined\", function() {\n      var commandStack;\n      commandStack = CommandStack();\n      return equals(commandStack.undo(), void 0);\n    });\n    it(\"redo on an empty stack returns undefined\", function() {\n      var commandStack;\n      commandStack = CommandStack();\n      return equals(commandStack.redo(), void 0);\n    });\n    it(\"executes commands\", function() {\n      var command, commandStack;\n      command = {\n        execute: function() {\n          return ok(true, \"command executed\");\n        }\n      };\n      commandStack = CommandStack();\n      return commandStack.execute(command);\n    });\n    it(\"can undo\", function() {\n      var command, commandStack;\n      command = {\n        execute: function() {},\n        undo: function() {\n          return ok(true, \"command executed\");\n        }\n      };\n      commandStack = CommandStack();\n      commandStack.execute(command);\n      return commandStack.undo();\n    });\n    it(\"can redo\", function() {\n      var command, commandStack;\n      command = {\n        execute: function() {\n          return ok(true, \"command executed\");\n        },\n        undo: function() {}\n      };\n      commandStack = CommandStack();\n      commandStack.execute(command);\n      commandStack.undo();\n      return commandStack.redo();\n    });\n    it(\"executes redone command once on redo\", function() {\n      var command, commandStack;\n      command = {\n        execute: function() {\n          return ok(true, \"command executed\");\n        },\n        undo: function() {}\n      };\n      commandStack = CommandStack();\n      commandStack.execute(command);\n      commandStack.undo();\n      commandStack.redo();\n      equals(commandStack.redo(), void 0);\n      return equals(commandStack.redo(), void 0);\n    });\n    it(\"command is returned when undone\", function() {\n      var command, commandStack;\n      command = {\n        execute: function() {},\n        undo: function() {}\n      };\n      commandStack = CommandStack();\n      commandStack.execute(command);\n      return equals(commandStack.undo(), command, \"Undone command is returned\");\n    });\n    it(\"command is returned when redone\", function() {\n      var command, commandStack;\n      command = {\n        execute: function() {},\n        undo: function() {}\n      };\n      commandStack = CommandStack();\n      commandStack.execute(command);\n      commandStack.undo();\n      return equals(commandStack.redo(), command, \"Redone command is returned\");\n    });\n    return it(\"cannot redo an obsolete future\", function() {\n      var Command, commandStack;\n      Command = function() {\n        return {\n          execute: function() {},\n          undo: function() {}\n        };\n      };\n      commandStack = CommandStack();\n      commandStack.execute(Command());\n      commandStack.execute(Command());\n      commandStack.undo();\n      commandStack.undo();\n      equals(commandStack.canRedo(), true);\n      commandStack.execute(Command());\n      return equals(commandStack.canRedo(), false);\n    });\n  });\n\n}).call(this);\n\n//# sourceURL=test/command_stack.coffee",
      "type": "blob"
    }
  },
  "entryPoint": "main",
  "dependencies": {},
  "remoteDependencies": [
    "http://strd6.github.io/require/v0.2.2.js"
  ],
  "progenitor": {
    "url": "http://strd6.github.io/editor/"
  },
  "repository": {
    "id": 11981428,
    "name": "commando",
    "full_name": "STRd6/commando",
    "owner": {
      "login": "STRd6",
      "id": 18894,
      "avatar_url": "https://2.gravatar.com/avatar/33117162fff8a9cf50544a604f60c045?d=https%3A%2F%2Fidenticons.github.com%2F39df222bffe39629d904e4883eabc654.png&r=x",
      "gravatar_id": "33117162fff8a9cf50544a604f60c045",
      "url": "https://api.github.com/users/STRd6",
      "html_url": "https://github.com/STRd6",
      "followers_url": "https://api.github.com/users/STRd6/followers",
      "following_url": "https://api.github.com/users/STRd6/following{/other_user}",
      "gists_url": "https://api.github.com/users/STRd6/gists{/gist_id}",
      "starred_url": "https://api.github.com/users/STRd6/starred{/owner}{/repo}",
      "subscriptions_url": "https://api.github.com/users/STRd6/subscriptions",
      "organizations_url": "https://api.github.com/users/STRd6/orgs",
      "repos_url": "https://api.github.com/users/STRd6/repos",
      "events_url": "https://api.github.com/users/STRd6/events{/privacy}",
      "received_events_url": "https://api.github.com/users/STRd6/received_events",
      "type": "User",
      "site_admin": false
    },
    "private": false,
    "html_url": "https://github.com/STRd6/commando",
    "description": "A simple JS command pattern.",
    "fork": false,
    "url": "https://api.github.com/repos/STRd6/commando",
    "forks_url": "https://api.github.com/repos/STRd6/commando/forks",
    "keys_url": "https://api.github.com/repos/STRd6/commando/keys{/key_id}",
    "collaborators_url": "https://api.github.com/repos/STRd6/commando/collaborators{/collaborator}",
    "teams_url": "https://api.github.com/repos/STRd6/commando/teams",
    "hooks_url": "https://api.github.com/repos/STRd6/commando/hooks",
    "issue_events_url": "https://api.github.com/repos/STRd6/commando/issues/events{/number}",
    "events_url": "https://api.github.com/repos/STRd6/commando/events",
    "assignees_url": "https://api.github.com/repos/STRd6/commando/assignees{/user}",
    "branches_url": "https://api.github.com/repos/STRd6/commando/branches{/branch}",
    "tags_url": "https://api.github.com/repos/STRd6/commando/tags",
    "blobs_url": "https://api.github.com/repos/STRd6/commando/git/blobs{/sha}",
    "git_tags_url": "https://api.github.com/repos/STRd6/commando/git/tags{/sha}",
    "git_refs_url": "https://api.github.com/repos/STRd6/commando/git/refs{/sha}",
    "trees_url": "https://api.github.com/repos/STRd6/commando/git/trees{/sha}",
    "statuses_url": "https://api.github.com/repos/STRd6/commando/statuses/{sha}",
    "languages_url": "https://api.github.com/repos/STRd6/commando/languages",
    "stargazers_url": "https://api.github.com/repos/STRd6/commando/stargazers",
    "contributors_url": "https://api.github.com/repos/STRd6/commando/contributors",
    "subscribers_url": "https://api.github.com/repos/STRd6/commando/subscribers",
    "subscription_url": "https://api.github.com/repos/STRd6/commando/subscription",
    "commits_url": "https://api.github.com/repos/STRd6/commando/commits{/sha}",
    "git_commits_url": "https://api.github.com/repos/STRd6/commando/git/commits{/sha}",
    "comments_url": "https://api.github.com/repos/STRd6/commando/comments{/number}",
    "issue_comment_url": "https://api.github.com/repos/STRd6/commando/issues/comments/{number}",
    "contents_url": "https://api.github.com/repos/STRd6/commando/contents/{+path}",
    "compare_url": "https://api.github.com/repos/STRd6/commando/compare/{base}...{head}",
    "merges_url": "https://api.github.com/repos/STRd6/commando/merges",
    "archive_url": "https://api.github.com/repos/STRd6/commando/{archive_format}{/ref}",
    "downloads_url": "https://api.github.com/repos/STRd6/commando/downloads",
    "issues_url": "https://api.github.com/repos/STRd6/commando/issues{/number}",
    "pulls_url": "https://api.github.com/repos/STRd6/commando/pulls{/number}",
    "milestones_url": "https://api.github.com/repos/STRd6/commando/milestones{/number}",
    "notifications_url": "https://api.github.com/repos/STRd6/commando/notifications{?since,all,participating}",
    "labels_url": "https://api.github.com/repos/STRd6/commando/labels{/name}",
    "created_at": "2013-08-08T16:51:40Z",
    "updated_at": "2013-09-29T21:08:02Z",
    "pushed_at": "2013-09-29T21:08:02Z",
    "git_url": "git://github.com/STRd6/commando.git",
    "ssh_url": "git@github.com:STRd6/commando.git",
    "clone_url": "https://github.com/STRd6/commando.git",
    "svn_url": "https://github.com/STRd6/commando",
    "homepage": null,
    "size": 192,
    "watchers_count": 0,
    "language": "CoffeeScript",
    "has_issues": true,
    "has_downloads": true,
    "has_wiki": true,
    "forks_count": 0,
    "mirror_url": null,
    "open_issues_count": 0,
    "forks": 0,
    "open_issues": 0,
    "watchers": 0,
    "master_branch": "master",
    "default_branch": "master",
    "permissions": {
      "admin": true,
      "push": true,
      "pull": true
    },
    "network_count": 0,
    "branch": "v0.9.0",
    "defaultBranch": "master"
  }
});