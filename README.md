# difftrack
Track a point in a block of text across a diff.

![example](https://github.com/zadjii/difftrack/raw/master/docs/example-000.png)

See how each of the original points is basically in the same place in the final
text? It's pretty cool like that.

## Super simple sample

``` html

<script src="..\dep\text-diff.js"></script>
<script src="..\src\difftrack.js"></script>
<script defer>
    var initial_text = "Hello, world! This is some sample text";
    var final_text = "Hello there, this is some sample text";

    var diffs = new DiffSet(initial_text, final_text);
    console.log(diffs.translate_point({x:0, y:0})); // => (0, 0)
    console.log(diffs.translate_point({x:8, y:0})); // => (5, 0), right before the deleted ", world"
    console.log(diffs.translate_point({x:23, y:0})); // => (22, 0)
</script>

```
