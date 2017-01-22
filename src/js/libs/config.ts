import { readFile } from "fs";
import { normalize } from "path";
import * as url from "url";
import * as R from "ramda";
import { safeLoad } from "js-yaml";
import { Store } from "redux";
import { AppState } from "../reducers";
import { configLoad, authSetup } from "../actions";

/**
 * コンフィグクラス
 * 設定ファイルはYAML形式
 */
export default class Config {
    private done: boolean = false;
    private path: url.Url | string | null = null;
    private filePath: string | null = null;
    constructor(filePath: string, private store: Store<AppState>) {
        this.filePath = normalize(filePath);
        this.loadFile(this.filePath);
    }

    loadFile(filePath) {
        readFile(filePath, "utf8", (err, data) => {
            if (err) {
                this.store.dispatch(configLoad(err));
                return;
            }
            try {
                this.loadData(safeLoad(data));
            } catch (e) {
                this.store.dispatch(configLoad(e));
            }
        });
    }

    loadData(config) {
        this.store.dispatch(authSetup(config.startScreen.auth));
        this.store.dispatch(configLoad(this.path));
    }
}
