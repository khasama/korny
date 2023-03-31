let addContent, editContent, currentMovie;
const base = `${window.origin}/admin`;
$(document).ready(function () {

    $("#dataTable").DataTable({ "order": [] });

    $("#btn-scrollToTop").click(() => {
        $("html, body").animate({ scrollTop: 0 }, "slow");
    });

    $("#newFanpage").click(() => {
        $("#newFanpage").prop('disabled', true);
        const name = $("#addFanpageName").val().trim();
        const id = $("#addFanpageId").val().trim();
        if (name || id) {
            $.ajax({
                type: "POST",
                url: `${base}/fanpage`,
                data: { name, id },
                success: (result) => {
                    if (result.status == "success") {
                        alert(result.status);
                        location.reload();
                    } else {
                        $("#newFanpage").prop('disabled', false);
                        showAlert("danger", `${result.message}`);
                    }
                }
            });
        } else {
            $("#newFanpage").prop('disabled', false);
            showAlert("danger", `Not emty !!!`);
        }
    });

    $("#btnGetImgOfFanpage").click(() => {
        $("#btnGetImgOfFanpage").prop('disabled', true);
        const id = $("#idFanpage").val();
        const limit = $("#limit").val();
        if (id) {
            $.ajax({
                type: "POST",
                url: `${base}/tool/fanpage`,
                data: {
                    id,
                    limit
                },
                success: (result) => {
                    if (result.status == 'success') {
                        showAlert("success", result.message);
                    } else {
                        showAlert("error", result.message);
                    }
                    $("#btnGetImgOfFanpage").prop('disabled', false);
                },
                error: (err) => {
                    $("#btnGetImgOfFanpage").prop('disabled', false);
                    showAlert("error", "Lỗi");
                }
            });
        } else {
            $("#btnGetImgOfFanpage").prop('disabled', false);
            showAlert("warning", "Emty !!!");
        }
    });
});



function deleteFanpage(ele) {
    const id = $(ele).attr("data-id");
    if (confirm("Are you sure about that ???")) {
        $.ajax({
            type: "DELETE",
            url: `${base}/fanpage/sd/${id}`,
            success: (result) => {
                if (result.status == "success") {
                    alert(result.status);
                    location.reload();
                } else {
                    alert(result.message);
                }
            }
        });
    }
}

function zoomImage(ele) {
    const uri = $(ele).attr('data-uri');
    $("#imgZoom").attr("src", uri);
    $("#zoomImage").modal("show");
}

function deleteImage(ele) {
    $(ele).prop('disabled', true);
    const id = $(ele).attr("data-id");
    if (confirm("Are you sure about that ???")) {
        $.ajax({
            type: "DELETE",
            url: `${base}/image/${id}`,
            success: (result) => {
                if (result.status == "success") {
                    showAlert("success", `Delete success`);
                } else {
                    $(ele).prop('disabled', false);
                    showAlert("danger", result.message);
                }
            }
        });
    } else {
        $(ele).prop('disabled', false);
    }
}

function realDeleteImage(ele) {
    $(ele).prop('disabled', true);
    const id = $(ele).attr("data-id");
    if (confirm("Are you sure about that ???")) {
        $.ajax({
            type: "DELETE",
            url: `${base}/image/delete?id=${id}`,
            success: (result) => {
                if (result.status == "success") {
                    showAlert("success", `Delete success`);
                    $(`#${id}`).remove();
                } else {
                    $(ele).prop('disabled', false);
                    showAlert("danger", result.message);
                }
            }
        });
    } else {
        $(ele).prop('disabled', false);
    }
}
function realDeleteAll(ele) {
    if (confirm("Are you sure about that ???")) {
        $.ajax({
            type: "DELETE",
            url: `${base}/image/delete`,
            success: (result) => {
                if (result.status == "success") {
                    location.reload();
                } else {
                    showAlert("danger", result.message);
                }
            }
        });
    } else {
        $(ele).prop('disabled', false);
    }
}

function restoreImage(ele) {
    $(ele).prop('disabled', true);
    const id = $(ele).attr("data-id");
    if (confirm("Are you sure about that ???")) {
        $.ajax({
            type: "PUT",
            url: `${base}/image/restore/${id}`,
            success: (result) => {
                if (result.status == "success") {
                    showAlert("success", `restore success success`);
                    $(`#${id}`).remove();
                } else {
                    $(ele).prop('disabled', false);
                    showAlert("danger", result.message);
                }
            }
        });
    } else {
        $(ele).prop('disabled', false);
    }
}

function getUser(ele, type) {
    const id = $(ele).attr("data-id");
    $.ajax({
        url: `${base}/user/${id}`,
        success: (result) => {
            if (result.status == "success") {
                const user = result.data;
                if (type == 'cr') {
                    $("#changRoleUsername").val(user.username);
                    $("#idUserCR").val(user._id);
                    $(`#newRole`).val(user.role);
                    $("#changeRoleModal").modal("show");
                }
                if (type == 'cp') {
                    $("#changePassUsername").val(user.username);
                    $("#idUserCP").val(user._id);
                    $("#changePassModal").modal("show");
                }
            } else {
                alert(result.message);
            }
        }
    });
}

function login() {
    const username = $("#username").val();
    const password = $("#password").val();
    if (username && password) {
        $.ajax({
            type: "POST",
            url: `${base}/auth/login`,
            data: {
                username,
                password
            },
            success: (result) => {
                if (result.status == "success") {
                    alert(result.status);
                    window.location = '/';
                } else {
                    alert(result.message);
                }
            },
            error: (err) => {
                console.log(err);
                alert(err.statusText);
            },
        });
    } else {
        alert("Not emty !!!");
    }
}

function logout() {
    $.ajax({
        url: `${base}/auth/logout`,
        type: "POST",
        success: (result) => {
            if (result.status == "success") {
                window.location = '/login';
            } else {
                alert(result.message);
            }
        },
        error: (err) => {
            alert(err.statusText);
        },
    });
}

function activeBtn(ele, type) {
    let ctn;
    if (type == 'ep') {
        ctn = document.getElementById("list-eps");
    } else {
        ctn = document.getElementById("list-link");
    }
    let currents = ctn.getElementsByClassName("active");
    if (currents.length > 0) {
        for (let i = 0; i < currents.length; i++) {
            currents[0].className = currents[0].className.replace(
                " active",
                ""
            );
        }
    }
    $(ele).addClass("active");
}

function calculateTime(date) {
    const curentDate = new Date();
    const lastAccess = parseInt((curentDate.getTime() - Date.parse(date)) / 1000 / 60 / 60);

    if (lastAccess < 24) {
        return `${lastAccess} hour${lastAccess > 1 ? 's' : ''} ago`;
    }
    if (lastAccess >= 24 && lastAccess < 168) {
        return `${parseInt(lastAccess / 24)} day${parseInt(lastAccess / 24) > 1 ? 's' : ''} ago`;
    }
    if (lastAccess >= 168 && lastAccess < 720) {
        return `${parseInt(lastAccess / 24 / 7)} week${parseInt(lastAccess / 24 / 7) > 1 ? 's' : ''} ago`;
    }
    if (lastAccess >= 720 && lastAccess < 8760) {
        return `${parseInt(lastAccess / 24 / 7 / 30)} month${parseInt(lastAccess / 24 / 7 / 30) > 1 ? 's' : ''} ago`;
    }
    if (lastAccess >= 8760) {
        return `${parseInt(lastAccess / 24 / 365)} year${parseInt(lastAccess / 24 / 365) > 1 ? 's' : ''} ago`;
    }

}

function showAlert(type, mess) {
    const area = $("#alert-area");
    const num = area.children().length;
    const alert = `<div class="alert alert-${type} alert-${num}" role="alert"> ${mess} </div>`;
    area.append(alert);
    setInterval(() => {
        $(`.alert-${num}`).hide(100);
    }, 3000);
}

function sendRefreshToken() {
    $.ajax({
        url: `${base}/auth/refresh-token`,
        type: "POST",
        success: (result) => {
            if (result.status == "success") {
                showAlert("success", `renew access token !!!`);
            } else {
                window.location = '/login';
            }
        }
    });
}

function copyLink(ele) {
    const link = $(ele).attr("data-link");
    if (link != '' && link) {
        copyToClipboard(link).then(() => {
            showAlert("success", "Copied");
        });
    }
}

function copyToClipboard(textToCopy) {
    // navigator clipboard api needs a secure context (https)
    if (navigator.clipboard && window.isSecureContext) {
        // navigator clipboard api method'
        return navigator.clipboard.writeText(textToCopy);
    } else {
        // text area method
        let textArea = document.createElement("textarea");
        textArea.value = textToCopy;
        // make the textarea out of viewport
        textArea.style.position = "fixed";
        textArea.style.left = "-999999px";
        textArea.style.top = "-999999px";
        document.body.appendChild(textArea);
        textArea.focus();
        textArea.select();
        return new Promise((res, rej) => {
            // here the magic happens
            document.execCommand('copy') ? res() : rej();
            textArea.remove();
        });
    }
}

$(document).bind("ajaxError", (event, request, settings) => {
    if (request.status === 401) {
        sendRefreshToken();
    } else {
        showAlert("danger", `Lỗi Server ${request.statusText}`);
    }

});