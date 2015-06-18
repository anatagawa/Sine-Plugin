import * as fs from "fs";

SupAPI.registerPlugin("typescript", "Sine", {
	code: fs.readFileSync(`${__dirname}/Sup.Sine.ts.txt`, { encoding: "utf8" }),
	defs: fs.readFileSync(`${__dirname}/Sup.Sine.d.ts.txt`, { encoding: "utf8" }),
	exposeActorComponent: { propertyName: "sine", className: "Sup.Sine" }
});
