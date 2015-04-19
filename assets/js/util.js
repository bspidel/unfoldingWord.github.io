"use strict";

/**
 * Joins path segments.  Preserves initial "/" and resolves ".." and "."
 *
 * source: https://github.com/creationix/pathjoin/blob/master/pathjoin.js
 * date:   2015-04-19
 *
 * @returns string
 */
function pathJoin(/* path segments */) {

    // Split the inputs into a list of path commands.
    var parts = [];
    for (var i = 0, l = arguments.length; i < l; i++) {
        if (arguments[i] === undefined || arguments[i] === null) continue;
        parts = parts.concat(arguments[i].split("/"));
    }

    // Interpret the path commands to get the new resolved path.
    var newParts = [];
    for (i = 0, l = parts.length; i < l; i++) {
        var part = parts[i];

        // Remove leading and trailing slashes. Also remove "." segments
        if (!part || part === ".") continue;

        // Interpret ".." to pop the last segment
        if (part === "..") newParts.pop();

        // Push new path segments.
        else newParts.push(part);
    }

    // Preserve the initial slash if there was one.
    if (parts[0] === "") newParts.unshift("");

    // Turn back into a single string path.
    return newParts.join("/") || (newParts.length ? "/" : ".");
}
