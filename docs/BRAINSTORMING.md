For a given point (x_o,y_o), and a set of diffs (content, add/remove/unchanged)

``` js
function locate_point(initial, diffs) {
    let curr = {x:0 , y:0};
    let target = {x:initial.x , y:initial.y};
    x_t, y_t = x_o, y_o

    for diff in diffs:
        if diff.content=='\n':
            if curr.y < y_t && diff.removed:
                y_t--
            else if curr.y < y_t && diff.added:
                y_t++
                // curr.y++
            else if (curr.y < y_t && diff.unchanged):
                curr.y++


            else if curr.y == y_t && diff.removed:
                y_t--
            else if curr.y == y_t && diff.added:
                // we added a newline before where we thought the point was
                // move the point left by the current line's length, then
                x_t -= curr.x
                y_t++
            else (if curr.y == y_t && diff.unchanged):
                // there was a newline on the line we thought the point should be
                // I guess it's here now?
                x_f, y_f = curr.x, curr.y
                break

            if (diff.added || unchanged):
                curr.y++
                curr.x=0


        c_len = diff.content.length
        if curr.y == y_t:
            if curr.x+c_len >= x_t && diff.removed
                x_f, y_f = curr.x, curr.y
                break
            else if curr.x+c_len >= x_t && (diff.added || unchanged)
                x_f, y_f = x_t, curr.y
                break

            // If the current segment is inserted/deleted before the point, then adjust the point accordingly
            if curr.x+c_len < x_t && (added || removed)
                x_t += (added? 1 : -1) * c_len
            // so if we remove a word len 5 then add a word len 3, we'll end up moving the target up 2 characters

            curr.x += c_len if diff.added or diff.unchanged

        if curr.x > x_t && curr.y > y_t {
            console.error("I don't believe this should happen");
            console.error(curr);
            console.error(target);
        }

}
```



I dunno if structuredPatch is really what I want., because for blocks that are almost the same, it's painful
Case in point:

```
0: " "
1: "-// This is a very, VERY simple c program"
2: "+// This is a pretty simple C program"
3: "+#include <stdio.h>"
4: "+int main(int argc, char* argv){"
5: "+    printf(\"hello there\");"
​​​​6: " "
​​​​7: "-void main(){"
​​​​8: "-    printf(\"hello, world\");"
​​​​9: "-    // return 0;"
​​​​10: "-}"
​​​​11: "+    for (int i = 0; i < argc; i++) {"
​​​​12: "+        printf(\"%s\\n\", argv[i]);"
​​​​13: "+    }"
​​​​14: "+    return 0;"
​​​​15: "+}"
​​​​16: "\\ No newline at end of file"
```

It's hard to tell that the two main() lines are even related
unless you used the structured diff to find which lines were different
curr = 0
newY
if line[0] = +
    newY += 1
if ine[0] = -
    oldY += 1

no I don't know what I'm doing with that.
