"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
Object.defineProperty(exports, "__esModule", { value: true });
var typeorm_1 = require("typeorm");
var users_1 = require("./users");
var Chat = /** @class */ (function () {
    function Chat() {
    }
    __decorate([
        typeorm_1.PrimaryGeneratedColumn({
            type: "bigint",
            unsigned: true,
            name: "Id"
        })
    ], Chat.prototype, "Id", void 0);
    __decorate([
        typeorm_1.ManyToOne(function () { return users_1.users; }, function (users) { return users.chats; }, { nullable: false, onDelete: 'CASCADE', onUpdate: 'CASCADE' }),
        typeorm_1.JoinColumn({ name: 'sendUserId' })
    ], Chat.prototype, "sendUser", void 0);
    __decorate([
        typeorm_1.ManyToOne(function () { return users_1.users; }, function (users) { return users.chats2; }, { nullable: false, onDelete: 'CASCADE', onUpdate: 'CASCADE' }),
        typeorm_1.JoinColumn({ name: 'receiveUserId' })
    ], Chat.prototype, "receiveUser", void 0);
    __decorate([
        typeorm_1.Column("varchar", {
            nullable: false,
            length: 100,
            name: "message"
        })
    ], Chat.prototype, "message", void 0);
    __decorate([
        typeorm_1.Column("timestamp", {
            nullable: false,
            default: function () { return "'CURRENT_TIMESTAMP(6)'"; },
            name: "created_at"
        })
    ], Chat.prototype, "created_at", void 0);
    Chat = __decorate([
        typeorm_1.Entity("Chat", { schema: "loungemate" }),
        typeorm_1.Index("newConst", ["sendUser",]),
        typeorm_1.Index("newConstra", ["receiveUser",])
    ], Chat);
    return Chat;
}());
exports.Chat = Chat;
