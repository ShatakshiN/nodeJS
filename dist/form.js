var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __generator = (this && this.__generator) || function (thisArg, body) {
    var _ = { label: 0, sent: function() { if (t[0] & 1) throw t[1]; return t[1]; }, trys: [], ops: [] }, f, y, t, g = Object.create((typeof Iterator === "function" ? Iterator : Object).prototype);
    return g.next = verb(0), g["throw"] = verb(1), g["return"] = verb(2), typeof Symbol === "function" && (g[Symbol.iterator] = function() { return this; }), g;
    function verb(n) { return function (v) { return step([n, v]); }; }
    function step(op) {
        if (f) throw new TypeError("Generator is already executing.");
        while (g && (g = 0, op[0] && (_ = 0)), _) try {
            if (f = 1, y && (t = op[0] & 2 ? y["return"] : op[0] ? y["throw"] || ((t = y["return"]) && t.call(y), 0) : y.next) && !(t = t.call(y, op[1])).done) return t;
            if (y = 0, t) op = [op[0] & 2, t.value];
            switch (op[0]) {
                case 0: case 1: t = op; break;
                case 4: _.label++; return { value: op[1], done: false };
                case 5: _.label++; y = op[1]; op = [0]; continue;
                case 7: op = _.ops.pop(); _.trys.pop(); continue;
                default:
                    if (!(t = _.trys, t = t.length > 0 && t[t.length - 1]) && (op[0] === 6 || op[0] === 2)) { _ = 0; continue; }
                    if (op[0] === 3 && (!t || (op[1] > t[0] && op[1] < t[3]))) { _.label = op[1]; break; }
                    if (op[0] === 6 && _.label < t[1]) { _.label = t[1]; t = op; break; }
                    if (t && _.label < t[2]) { _.label = t[2]; _.ops.push(op); break; }
                    if (t[2]) _.ops.pop();
                    _.trys.pop(); continue;
            }
            op = body.call(thisArg, _);
        } catch (e) { op = [6, e]; y = 0; } finally { f = t = 0; }
        if (op[0] & 5) throw op[1]; return { value: op[0] ? op[1] : void 0, done: true };
    }
};
document.addEventListener('DOMContentLoaded', function () {
    var form = document.getElementById('msgForm');
    var msgInput = form === null || form === void 0 ? void 0 : form.elements.namedItem('msg');
    if (!form || !msgInput)
        return;
    var editIndex = null;
    function sendData(event) {
        return __awaiter(this, void 0, void 0, function () {
            var userMsg, sendmsg, response, data, li, err_1;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0:
                        event.preventDefault();
                        if (!msgInput)
                            return [2 /*return*/];
                        userMsg = msgInput.value.trim();
                        if (!userMsg)
                            return [2 /*return*/];
                        sendmsg = { message: userMsg };
                        _a.label = 1;
                    case 1:
                        _a.trys.push([1, 7, , 8]);
                        response = void 0;
                        if (!(editIndex !== null)) return [3 /*break*/, 3];
                        return [4 /*yield*/, fetch("http://localhost:4000/home/".concat(editIndex), {
                                method: "PUT",
                                headers: { "Content-Type": "application/json" },
                                body: JSON.stringify(sendmsg),
                            })];
                    case 2:
                        response = _a.sent();
                        return [3 /*break*/, 5];
                    case 3: return [4 /*yield*/, fetch('http://localhost:4000/home', {
                            method: "POST",
                            headers: { "Content-Type": "application/json" },
                            body: JSON.stringify(sendmsg)
                        })];
                    case 4:
                        response = _a.sent();
                        _a.label = 5;
                    case 5: return [4 /*yield*/, response.json()];
                    case 6:
                        data = _a.sent();
                        if (response.ok) {
                            if (editIndex !== null) {
                                li = document.querySelector("li[data-index=\"".concat(editIndex, "\"]"));
                                if (li)
                                    li.querySelector('.msg-text').textContent = data.message;
                                editIndex = null;
                            }
                            else {
                                showMsg(data);
                            }
                            msgInput.value = "";
                        }
                        return [3 /*break*/, 8];
                    case 7:
                        err_1 = _a.sent();
                        console.log(err_1);
                        return [3 /*break*/, 8];
                    case 8: return [2 /*return*/];
                }
            });
        });
    }
    function showMsg(sendmsg) {
        var _this = this;
        var _a;
        var parentElement = document.getElementById('messageList');
        if (!parentElement)
            return;
        var childElement = document.createElement('li');
        childElement.setAttribute("data-index", String((_a = sendmsg.index) !== null && _a !== void 0 ? _a : 0));
        childElement.className = "list-group-item d-flex justify-content-between align-items-center";
        var msgSpan = document.createElement('span');
        msgSpan.className = "msg-text";
        msgSpan.textContent = sendmsg.message;
        var delButton = document.createElement('button');
        delButton.textContent = 'DELETE';
        delButton.className = "btn btn-danger btn-sm ms-3";
        delButton.addEventListener("click", function () { return __awaiter(_this, void 0, void 0, function () {
            var response, err_2;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0:
                        _a.trys.push([0, 2, , 3]);
                        return [4 /*yield*/, fetch("http://localhost:4000/home/".concat(sendmsg.index), {
                                method: "DELETE",
                            })];
                    case 1:
                        response = _a.sent();
                        if (response.ok) {
                            parentElement.removeChild(childElement);
                        }
                        return [3 /*break*/, 3];
                    case 2:
                        err_2 = _a.sent();
                        console.error("Delete failed", err_2);
                        return [3 /*break*/, 3];
                    case 3: return [2 /*return*/];
                }
            });
        }); });
        var editButton = document.createElement('button');
        editButton.textContent = 'EDIT';
        editButton.className = "btn btn-warning btn-sm ms-3";
        editButton.addEventListener("click", function () {
            var _a;
            msgInput.value = sendmsg.message;
            editIndex = (_a = sendmsg.index) !== null && _a !== void 0 ? _a : null;
        });
        childElement.appendChild(msgSpan);
        childElement.appendChild(editButton);
        childElement.appendChild(delButton);
        parentElement.appendChild(childElement);
    }
    form.addEventListener("submit", sendData);
});
