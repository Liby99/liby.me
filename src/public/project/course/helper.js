/**
 * get center of gravity of inserted nodes
 * @param nodes, array of svg DOMs
 * @return { x: x-coord of center of gravity
 *           y: y-coord of center of gravity }
 */
function gravityCenter(nodes) {
    var x = 0;
    var y = 0;
    var num = 0;
    nodes.forEach((node) => {
        num++;
        x += node.x;
        y += node.y;
    });
    return { x: x / num, y: y / num };
}

/**
 * get array of coord of to-Be-Inserted
 * @param nodes, array of svg DOMs to calc center of gravity
 * @param insertNode, node to attach to-Be-Inserted to
 * @param num, number of nodes to be inserted.
 * @return, array of coord of to-Be-Inserted node
 */
function getNextCoords(nodes, insertNode, num) {

    var gCenter = gravityCenter(nodes);
    if (nodes.length == 1) {
        gCenter.y = gCenter.y - 20;
    }

    var bisectorAngle = Math.atan2(insertNode.y - gCenter.y,
                                   insertNode.x - gCenter.x);
    // if insert node is only one
    if (num == 1) {
        return [{ x: insertNode.x + 50 * Math.cos(bisectorAngle),
                  y: insertNode.y + 50 * Math.sin(bisectorAngle) }];
    }

    // else find steps between each angle and push to coord array
    var maxAngle = bisectorAngle + Math.PI / 3;
    var stepAngle = Math.PI *2 / 3 / (num - 1);
    var coordArr = [];
    for (var i = 0; i < num; i++) {
        coordArr.push({ x: insertNode.x + 50 * Math.cos(maxAngle),
                        y: insertNode.y + 50 * Math.sin(maxAngle) });
        maxAngle -= stepAngle;
    }
    return coordArr;
}
