import { safeLoad } from "js-yaml";
import { readFile } from "fs";
import { Store } from "redux";
import { AppState } from "./reducers";
import { configLoad } from "./actions";

/**
 * コンフィグクラス
 * 設定ファイルはYAML形式
 */
export default class Config {
    private static get DEFAULT_CONFIG() {
        return {
            control: {
                type: "local",
                url: null,
                fallback: "local",
            },
            admin: {
                password: null
            },
            start_screen: {
            }
        };
    }

    private done: boolean = false;
    constructor(private filePath: string, private store: Store<AppState>) {
        this.loadFile(this.filePath);
    }

    loadFile(filePath) {
        readFile(filePath, "utf8", (err, data) => {
            if (err) {
                this.store.dispatch(configLoad(err));
                return;
            }
            this.loadData(safeLoad(data));
        });
    }
    loadData(config) {
        this.store.dispatch(configLoad(true));
    }

}
