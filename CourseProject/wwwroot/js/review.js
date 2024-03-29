﻿var dataTable;

$(document).ready(function () {
    loadDataTable()
});

function convertToPlain(html) {
    let tempDivElement = document.createElement("div");
    tempDivElement.innerHTML = html;
    return tempDivElement.textContent || tempDivElement.innerText || "";
}

function trimText(text, len) {
    let plainText = convertToPlain(text);
    if (plainText.len <= len) {
        return plainText;
    }
    let trimmed = plainText.substr(0, len);
    let index = trimmed.lastIndexOf(' ');
    if (index > 0) {
        trimmed = trimmed.substr(0, index);
    }
    return trimmed + '...';
}

function loadDataTable(url) {
    dataTable = $("#tableData").DataTable({
        "ajax": {
            "url": "/review/GetReviewList"
        },
        "columns": [
            { "data": "title", "width": "15%" },
            { "data": "author", "width": "10%" },
            { "data": "nameObject", "width": "15%" },
            { "data": "datePublication", "width": "10%" },
            {
                "data": "description", "width": "20%",
                "render": function (data) {
                    return trimText(data, 45);
                }
            },
            { "data": "rating", "width": "10%" },
            {
                "data": "id",
                "render": function (data) {
                    return `
                    <div class="w-100 btn-group" role="group">
                                <a href="/Review/Upsert/${data}" class="btn btn-primary mx-2 text-white" style="cursor:pointer">
                                    <i class="fas fa-edit"></i>
                                </a>
                                <a href="/Review/Delete/${data}" class="btn btn-danger mx-2 text-white" style="cursor:pointer">
                                    <i class="far fa-trash-alt"></i>
                                </a>
                                <a href="/Review/Preview/${data}" class="btn btn-success mx-2 text-white" style="cursor:pointer">
                                    <i class="far fa-eye"></i>
                                </a>
                    </div>
                    `;
                },
                "width": "20%"
            }
        ]
    })
}