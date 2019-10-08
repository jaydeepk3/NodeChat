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
var blocks = /** @class */ (function () {
    function blocks() {
    }
    __decorate([
        typeorm_1.PrimaryGeneratedColumn({
            type: "bigint",
            unsigned: true,
            name: "id"
        })
    ], blocks.prototype, "id", void 0);
    __decorate([
        typeorm_1.ManyToOne(function () { return users_1.users; }, function (users) { return users.blockss; }, { nullable: false, onDelete: 'CASCADE', onUpdate: 'CASCADE' }),
        typeorm_1.JoinColumn({ name: 'user_id' })
    ], blocks.prototype, "user", void 0);
    __decorate([
        typeorm_1.Column("varchar", {
            nullable: true,
            name: "block_type"
        })
    ], blocks.prototype, "block_type", void 0);
    __decorate([
        typeorm_1.Column("varchar", {
            nullable: true,
            name: "block_value"
        })
    ], blocks.prototype, "block_value", void 0);
    __decorate([
        typeorm_1.Column("varchar", {
            nullable: true,
            name: "block_value_type"
        })
    ], blocks.prototype, "block_value_type", void 0);
    __decorate([
        typeorm_1.Column("datetime", {
            nullable: true,
            name: "block_time"
        })
    ], blocks.prototype, "block_time", void 0);
    __decorate([
        typeorm_1.Column("tinyint", {
            nullable: false,
            width: 1,
            default: function () { return "'0'"; },
            name: "unblock"
        })
    ], blocks.prototype, "unblock", void 0);
    __decorate([
        typeorm_1.Column("timestamp", {
            nullable: true,
            name: "created_at"
        })
    ], blocks.prototype, "created_at", void 0);
    __decorate([
        typeorm_1.Column("timestamp", {
            nullable: true,
            name: "updated_at"
        })
    ], blocks.prototype, "updated_at", void 0);
    blocks = __decorate([
        typeorm_1.Entity("blocks", { schema: "loungemate" }),
        typeorm_1.Index("blocks_user_id_foreign", ["user",])
    ], blocks);
    return blocks;
}());
exports.blocks = blocks;
