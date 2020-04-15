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
var devices = /** @class */ (function () {
    function devices() {
    }
    __decorate([
        typeorm_1.PrimaryGeneratedColumn({
            type: "bigint",
            unsigned: true,
            name: "id",
        })
    ], devices.prototype, "id", void 0);
    __decorate([
        typeorm_1.ManyToOne(function () { return users_1.users; }, function (users) { return users.devicess; }, {
            nullable: false,
            onDelete: "CASCADE",
            onUpdate: "CASCADE",
        }),
        typeorm_1.JoinColumn({ name: "user_id" })
    ], devices.prototype, "user", void 0);
    __decorate([
        typeorm_1.Column("varchar", {
            nullable: true,
            name: "device_id",
        })
    ], devices.prototype, "device_id", void 0);
    __decorate([
        typeorm_1.Column("text", {
            nullable: true,
            name: "push_token",
        })
    ], devices.prototype, "push_token", void 0);
    __decorate([
        typeorm_1.Column("timestamp", {
            nullable: true,
            name: "created_at",
        })
    ], devices.prototype, "created_at", void 0);
    __decorate([
        typeorm_1.Column("timestamp", {
            nullable: true,
            name: "updated_at",
        })
    ], devices.prototype, "updated_at", void 0);
    devices = __decorate([
        typeorm_1.Entity("devices", { schema: "loungemate" }),
        typeorm_1.Index("devices_user_id_foreign", ["user"])
    ], devices);
    return devices;
}());
exports.devices = devices;
