const modal = document.getElementById("myModal");
const scrollToTopBtn = $("#scrollToTopCtn");
const gallery = document.querySelector('#gallery');
let nextPage = 2;
const limit = 20;
let home = false;
function getVal(elem, style) { return parseInt(window.getComputedStyle(elem).getPropertyValue(style)); };
function getHeight(item) { return item.querySelector('.content').getBoundingClientRect().height; };
function resizeAll() {
    const altura = getVal(gallery, 'grid-auto-rows');
    const gap = getVal(gallery, 'grid-row-gap');
    gallery.querySelectorAll('.gallery-item').forEach(function (item) {
        const el = item;
        el.style.gridRowEnd = "span " + Math.ceil((getHeight(item) + gap) / (altura + gap));
    });
};
function showImageModal(ele) {
    const uri = $(ele).attr('data-uri');
    const width = parseInt($(ele).attr('data-width'));
    const height = parseInt($(ele).attr('data-height'));
    const raito = width / height;
    if (raito <= 0.7) {
        $("#modal-content").css('width', '400px');
    } else if (raito <= 1 && raito > 0.7) {
        $("#modal-content").css('width', '600px');
    } else {
        $("#modal-content").css('width', '850px');
    }
    $("#imgModal").attr("src", uri);
    modal.style.display = "block";
}

function loadMore() {
    const winScroll =
        document.body.scrollTop || document.documentElement.scrollTop;
    const height =
        document.documentElement.scrollHeight -
        document.documentElement.clientHeight;
    const scrolled = parseInt((winScroll / height) * 100);
    if (scrolled == 100) {
        $.ajax({
            type: "GET",
            url: `${domain}api/v1/images?page=${nextPage}&limit=${limit}`,
            success: (rs) => {
                if (rs.status == "success") {
                    const images = rs.data;
                    nextPage++;
                    images.forEach((ele) => {
                        $("#gallery").append(`
                                <div class="gallery-item">
                                    <div onclick="showImageModal(this)" class="content"
                                        data-uri="${domain}media/image/${ele._id}" data-width="${ele.width}"
                                        data-height="${ele.height}">
                                        <img src="${domain}media/image/${ele._id}" alt="korny" class="image">
                                    </div>
                                </div>
                            `);
                    });
                    gallery.querySelectorAll('img').forEach(function (item) {
                        if (item.complete) {
                            // console.log(item.src);
                        }
                        else {
                            item.addEventListener('load', function () {
                                const altura = getVal(gallery, 'grid-auto-rows');
                                const gap = getVal(gallery, 'grid-row-gap');
                                const gitem = item.parentElement.parentElement;
                                gitem.style.gridRowEnd = "span " + Math.ceil((getHeight(gitem) + gap) / (altura + gap));
                            });
                        }
                    });
                } else {
                    // $(".load-more").html(
                    //     "<p class='text-center text-danger'>Đã hết sản phẩm để hiển thị</p>"
                    // );
                }
            },
            error: (err) => {
                console.log(err);
            },
        });
    }
}

$(document).ready(function () {
    $("#closeModal").click(() => {
        modal.style.display = "none";
    });
    $("#scrollToTopCtn").click(() => {
        window.scrollTo({ top: 0, behavior: 'smooth' });
    });
    gallery.querySelectorAll('img').forEach(function (item) {
        if (item.complete) {
            // console.log(item.src);
        }
        else {
            item.addEventListener('load', function () {
                const altura = getVal(gallery, 'grid-auto-rows');
                const gap = getVal(gallery, 'grid-row-gap');
                const gitem = item.parentElement.parentElement;
                gitem.style.gridRowEnd = "span " + Math.ceil((getHeight(gitem) + gap) / (altura + gap));
            });
        }
    });
    window.onclick = function (event) {
        if (event.target == modal) {
            modal.style.display = "none";
        }
    }
    window.onscroll = function () {
        if (document.body.scrollTop > 20 || document.documentElement.scrollTop > 20) {
            scrollToTopBtn.css("display", "block");
        } else {
            scrollToTopBtn.css("display", "none")
        }

        if (home) {
            loadMore();
        }
    }
    window.addEventListener('resize', resizeAll);
});