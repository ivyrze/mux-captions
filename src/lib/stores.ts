import { writable } from "svelte/store";
import { browser } from "$app/environment";

const localStorageDefault = (key: string) => {
    return browser && (localStorage.getItem(key) ?? "");
};

const localStorageSubscriber = (key: string) => (val: any) => {
    if (browser) {
        val ?
            localStorage.setItem(key, val) :
            localStorage.removeItem(key);
    }
};

export const tokenId = writable(localStorageDefault("tokenId"));
export const tokenSecret = writable(localStorageDefault("tokenSecret"));

tokenId.subscribe(localStorageSubscriber("tokenId"));
tokenSecret.subscribe(localStorageSubscriber("tokenSecret"));