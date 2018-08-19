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