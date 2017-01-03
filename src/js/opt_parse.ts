import { app } from "electron";
const Getopt = require("node-getopt");

export interface Options {
    argv: string[];
    options: {
        debug: boolean,
        config: string
    };
}

const package_info = `${app.getName()} - version ${app.getVersion()}`;
const options = [
    ["c", "config=FILE", "config file"],
    ["d", "debug", "debug mode"],
    ["h", "help", "display this help"],
    ["v", "version", "show version"]
];
const helpTemplate = `${package_info}
Usage: oshirasekun [options]

[[OPTIONS]]
`;
const appExit = (exitCode = 0) => app.exit(exitCode);
const displayVersionAndQuit = () => {
    console.info(package_info);
    appExit();
};
const getOpt = Getopt.create(options)
    .bindHelp(helpTemplate)
    .on("version", displayVersionAndQuit);

export default function(argv: string[] = process.argv.slice(2)): Options {
    return getOpt.parse(argv);
}
