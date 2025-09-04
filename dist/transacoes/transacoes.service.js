"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};
var __param = (this && this.__param) || function (paramIndex, decorator) {
    return function (target, key) { decorator(target, key, paramIndex); }
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.TransacoesService = void 0;
const common_1 = require("@nestjs/common");
const typeorm_1 = require("@nestjs/typeorm");
const typeorm_2 = require("typeorm");
const transacao_entity_1 = require("./entity/transacao.entity");
let TransacoesService = class TransacoesService {
    repo;
    constructor(repo) {
        this.repo = repo;
    }
    async adicionar(usuario, valor, categoria, tipo) {
        const transacao = this.repo.create({ usuario, valor, categoria, tipo });
        await this.repo.save(transacao);
    }
    async resumo(usuario) {
        const transacoes = await this.repo.find({ where: { usuario } });
        if (!transacoes.length)
            return '📊 Sem transações.';
        const total = transacoes.reduce((s, t) => s + Number(t.valor), 0);
        const categorias = transacoes.reduce((acc, t) => {
            acc[t.categoria] = (acc[t.categoria] || 0) + Number(t.valor);
            return acc;
        }, {});
        let resposta = `📊 Resumo:\nTotal: R$${total}\n`;
        for (const [cat, val] of Object.entries(categorias)) {
            resposta += `- ${cat}: R$${val}\n`;
        }
        return resposta;
    }
};
exports.TransacoesService = TransacoesService;
exports.TransacoesService = TransacoesService = __decorate([
    (0, common_1.Injectable)(),
    __param(0, (0, typeorm_1.InjectRepository)(transacao_entity_1.Transacao)),
    __metadata("design:paramtypes", [typeorm_2.Repository])
], TransacoesService);
//# sourceMappingURL=transacoes.service.js.map