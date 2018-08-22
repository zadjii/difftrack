function point_equals(a, b) {
    return a.x == b.x && a.y == b.y;
}
function split_diffs(diffs) {
    let result = [];
    diffs.map(diff=>{
        let newline_index = diff.value.indexOf('\n');
        if (diff.value.length > 1 && newline_index != -1) {
            let elems = diff.value.split('\n');
            console.log(elems);
            elems.map((e, index)=>{
                if (e != "" || index == 0){
                    result.push({value: e, added:diff.added, removed:diff.removed});
                    if(index != elems.length-1) result.push({value: "\n", added:diff.added, removed:diff.removed});
                }
            });
            // let a = {value: diff.value.substr(0, newline_index), added:diff.added, removed:diff.removed};
            // let b = {value: diff.value.substr(newline_index, diff.value.length), added:diff.added, removed:diff.removed};
            // result.push(a);
            // result.push(b);
        }
        else{
            result.push(diff);
        }
    });
    return result;
}

function locate_point(initial, diffs) {
    let real_diffs = split_diffs(diffs);

    var curr = {x:0 , y:0};
    curr.x = 0;
    let target = {x:initial.x , y:initial.y};
    let final = {x:initial.x , y:initial.y};
    let found = false;
    for (var i = 0; i < real_diffs.length; i++) {
        let diff = real_diffs[i];

        let added = diff.added;
        let removed = diff.removed;
        let unchanged = !(added || removed);
        let content = diff.value;

        console.log({i:i, diff:diff, curr:{x:curr.x,y:curr.y}, target:{x:target.x,y:target.y}});

        if (content=='\n'){
            // console.log("content is newline");
            if (curr.y < target.y && removed) {
                target.y--;
            }
            else if (curr.y < target.y && added) {
                target.y++;
                // curr.y++

            }
            // else if (curr.y < target.y && unchanged) {
            //     curr.y++;
            // }


            else if (curr.y == target.y && removed) {
                target.y--;
                console.warn("I'm not sure when this case would hit or what to do");
            }
            else if (curr.y == target.y && added) {
                // we added a newline before where we thought the point was
                // move the point left by the current line's length, then
                target.x -= curr.x;
                target.y++;
            }
            else if (curr.y == target.y && unchanged){
                // there was a newline on the line we thought the point should be
                // I guess it's here now?
                final.x = curr.x;
                final.y = curr.y;
                found = true;
                break;
            }

            if (added || unchanged){
                curr.y++;
                curr.x = 0;
            }

        }
        else {
            let c_len = content.length;
            let content_end = curr.x + c_len;
            if (curr.y == target.y) {
                if (content_end >= target.x && diff.removed){
                    final.x = curr.x;
                    final.y = curr.y;
                    found = true;
                    break;

                }
                else if (content_end >= target.x && added) {
                    target.x += c_len;
                }
                else if (content_end >= target.x && (/*added || */unchanged)) {
                    // The spot we were looking for is in this segment,
                    final.x = target.x;
                    final.y = curr.y;
                    found = true;
                    break;
                }

                // If the current segment is inserted/deleted before the point, then adjust the point accordingly
                if (content_end < target.x && (removed)){
                    target.x += (-1) * c_len;
                // so if we remove a word len 5 then add a word len 3, we'll end up moving the target up 2 characters
                }

                // // If the current segment is inserted/deleted before the point, then adjust the point accordingly
                // if (content_end < target.x && (added || removed)){
                //     target.x += (added? 1 : -1) * c_len
                // // so if we remove a word len 5 then add a word len 3, we'll end up moving the target up 2 characters
                // }

            }
            curr.x += (added || unchanged)? c_len : 0;


        }


        if (curr.x > target.x && curr.y > target.y) {
            console.error("I don't believe this should happen");
            console.error(curr);
            console.error(target);
        }

    };

    if (!found) {
        console.error("Reached the end of the input without finding the point. It might be beyond the end of input.");
        final.x = final.y = -1;
    }
    // console.log("Translated " + initial.x + ", " + initial.y + " to " + final.x + ", " + final.y);
    return final;

}
