# Workflow

Workflow is a template, it defines the execution flow.

Workflow can be used to a node (plugin).

## title

Title of the workflow.

## desc

Description of the workflow.

## version

Every time the workflow is modified and saved, the version will be auto updated.

So, the user can view all versions, and start edit or run task from any version of workflow.

The format of version: random string `nanoid()` (user only know there are different version and its edit time).

## version title

Title of the version

## input param scheme

**Optional**

When input param scheme is set, before the workflow run, it should be set.

If the workflow is exported as plugin node, it will be the input of the node.

## output param scheme

**Optional**

The result will be logged when the task have done.

If the workflow is exported as plugin node, it will be the output of the node.
