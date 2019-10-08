"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
Object.defineProperty(exports, "__esModule", { value: true });
var typeorm_1 = require("typeorm");
var Chat_1 = require("./Chat");
var blocks_1 = require("./blocks");
var devices_1 = require("./devices");
var users = /** @class */ (function () {
    function users() {
    }
    __decorate([
        typeorm_1.PrimaryGeneratedColumn({
            type: "bigint",
            unsigned: true,
            name: "id"
        })
    ], users.prototype, "id", void 0);
    __decorate([
        typeorm_1.Column("enum", {
            nullable: false,
            default: function () { return "'guest'"; },
            enum: ["host", "guest", "both"],
            name: "role"
        })
    ], users.prototype, "role", void 0);
    __decorate([
        typeorm_1.Column("varchar", {
            nullable: false,
            name: "name"
        })
    ], users.prototype, "name", void 0);
    __decorate([
        typeorm_1.Column("varchar", {
            nullable: false,
            unique: true,
            name: "email"
        })
    ], users.prototype, "email", void 0);
    __decorate([
        typeorm_1.Column("varchar", {
            nullable: false,
            unique: true,
            name: "phone"
        })
    ], users.prototype, "phone", void 0);
    __decorate([
        typeorm_1.Column("timestamp", {
            nullable: true,
            name: "email_verified_at"
        })
    ], users.prototype, "email_verified_at", void 0);
    __decorate([
        typeorm_1.Column("varchar", {
            nullable: true,
            name: "password"
        })
    ], users.prototype, "password", void 0);
    __decorate([
        typeorm_1.Column("enum", {
            nullable: true,
            enum: ["facebook", "google"],
            name: "thirdparty_name"
        })
    ], users.prototype, "thirdparty_name", void 0);
    __decorate([
        typeorm_1.Column("text", {
            nullable: true,
            name: "thirdparty_token"
        })
    ], users.prototype, "thirdparty_token", void 0);
    __decorate([
        typeorm_1.Column("varchar", {
            nullable: true,
            name: "profile"
        })
    ], users.prototype, "profile", void 0);
    __decorate([
        typeorm_1.Column("tinyint", {
            nullable: false,
            width: 1,
            default: function () { return "'1'"; },
            name: "active"
        })
    ], users.prototype, "active", void 0);
    __decorate([
        typeorm_1.Column("varchar", {
            nullable: true,
            length: 100,
            name: "remember_token"
        })
    ], users.prototype, "remember_token", void 0);
    __decorate([
        typeorm_1.Column("timestamp", {
            nullable: true,
            name: "created_at"
        })
    ], users.prototype, "created_at", void 0);
    __decorate([
        typeorm_1.Column("timestamp", {
            nullable: true,
            name: "updated_at"
        })
    ], users.prototype, "updated_at", void 0);
    __decorate([
        typeorm_1.Column("tinyint", {
            nullable: false,
            width: 1,
            default: function () { return "'0'"; },
            name: "paid"
        })
    ], users.prototype, "paid", void 0);
    __decorate([
        typeorm_1.OneToMany(function () { return Chat_1.Chat; }, function (Chat) { return Chat.sendUser; }, { onDelete: 'CASCADE', onUpdate: 'CASCADE' })
    ], users.prototype, "chats", void 0);
    __decorate([
        typeorm_1.OneToMany(function () { return Chat_1.Chat; }, function (Chat) { return Chat.receiveUser; }, { onDelete: 'CASCADE', onUpdate: 'CASCADE' })
    ], users.prototype, "chats2", void 0);
    __decorate([
        typeorm_1.OneToMany(function () { return blocks_1.blocks; }, function (blocks) { return blocks.user; }, { onDelete: 'CASCADE', onUpdate: 'CASCADE' })
    ], users.prototype, "blockss", void 0);
    __decorate([
        typeorm_1.OneToMany(function () { return devices_1.devices; }, function (devices) { return devices.user; }, { onDelete: 'CASCADE', onUpdate: 'CASCADE' })
    ], users.prototype, "devicess", void 0);
    users = __decorate([
        typeorm_1.Entity("users", { schema: "loungemate" }),
        typeorm_1.Index("users_email_unique", ["email",], { unique: true }),
        typeorm_1.Index("users_phone_unique", ["phone",], { unique: true })
    ], users);
    return users;
}());
exports.users = users;
