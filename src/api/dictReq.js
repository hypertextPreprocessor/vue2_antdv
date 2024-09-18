import httpReq from "@src/utils/http.js";
export function carreralist(){
    return httpReq.get("/trade/list");
}