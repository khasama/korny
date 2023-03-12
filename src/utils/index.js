const fetch = require("node-fetch");
const accessToken = process.env.FB_ACCESS_TOKEN;
const cookie = process.env.FB_COOKIE;

async function fetchImages(url, id) {
    try {
        const arrData = []
        const fecthResult = await fetch(url, {
            method: "GET",
            headers: { cookie }
        });
        if (fecthResult.status == 200) {
            const cvToJson = await fecthResult.json();
            const data = cvToJson.data;
            const i = data.findIndex(e => e.id == id);
            if (i > -1) {
                for (const ele of data) {
                    if (ele.id != id) {
                        arrData.push({
                            postId: ele.id,
                            height: ele.height,
                            width: ele.width,
                            source: ele.source
                        });
                    } else {
                        return { arrData, next: false };
                    }
                }
            } else {
                for (const ele of data) {
                    arrData.push({
                        postId: ele.id,
                        height: ele.height,
                        width: ele.width,
                        source: ele.source
                    });
                }
                const next = cvToJson.paging.next || false;
                return { arrData, next };
            }
        } else {
            const res = await fecthResult.json();
            console.log(res);
            return { arrData, next: false };
        }
    } catch (error) {
        // console.log(error);
    }
}

module.exports = {
    getFanpageInformation: async (name) => {
        try {
            const rs = await fetch(`https://graph.facebook.com/${name}?access_token=${accessToken}`, {
                method: "GET",
                headers: {
                    cookie
                }
            });
            if (rs.status == 200) {
                const data = await rs.json();
                return {
                    idFanpage: data.id,
                    nameFanpage: data.username || data.name
                };
            } else {
                const res = await rs.json();
                console.log(res);
                return false;
            }
        } catch (error) {
            // console.log(error);
        }
    },
    fetchImages,
}