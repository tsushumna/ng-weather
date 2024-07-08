import { Injectable } from "@angular/core";
import { ConditionsAndZip } from "./conditions-and-zip.type";

@Injectable()
export class CachingService {
     static RESTORE_CACHE_SECONDS : number = 7200;

    getKey(prefix : string,keyValue :string) : string {
        return (prefix ? prefix+'-' : '') +keyValue;
    }
    
    storeInCache(prefix :string,key : string, value){
        localStorage.setItem(this.getKey(prefix,key),JSON.stringify(value));
    }

    checkInCacheAndValidate(prefix,key) : boolean {
        const data = (localStorage.getItem(this.getKey(prefix,key)));
        if(data){
            const cachedValue : ConditionsAndZip = {...JSON.parse(data)};
            // console.log( new Date(cachedValue.validUpto).getTime());
            // console.log(new Date().getSeconds())
            return new Date(cachedValue.validUpto) > new Date();
        }
        return false;
    }

    getFromCache(prefix:string,key:string){
        const data = localStorage.getItem(this.getKey(prefix,key));
        if(data){
            return JSON.parse(data);
        }
        return null;
    }

}