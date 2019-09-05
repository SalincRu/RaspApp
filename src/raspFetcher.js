//const endpoint = "/api.php";
const endpoint = "https://salinc.ru/rasp/api.php";

export function fetchGroups() {
    return fetch(endpoint + "?method=groups")
        .then(response => response.json());
}

export function fetchGroupRasp(group) {
    return fetch(endpoint + "?method=rasp&type=group&group=" + encodeURIComponent(group))
        .then(request => request.json());
}