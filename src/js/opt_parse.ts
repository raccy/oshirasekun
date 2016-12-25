import { app } from "electron";
const Getopt = require("node-getopt");

export interface Options {
    argv: string[];
    options: { debug: boolean };
}

const package_info = `${app.getName()} ${app.getVersion()}`;
const options = [
    ["d", "debug", "debug mode"],
    ["h", "help", "display this help"],
    ["v", "version", "show version"]
];
const helpTemplate = `${package_info}\nUsage: oshirasekun [options]\n\n[[OPTIONS]]\n`;
const appQuit = () => app.quit();
const displayVersionAndQuit = () => {
    console.info(package_info);
    appQuit();
};
const getOpt = Getopt.create(options)
    .bindHelp(helpTemplate)
    .on("version", displayVersionAndQuit);

export default function(argv: string[] = process.argv.slice(2)): Options {
    return getOpt.parse(argv);
}
