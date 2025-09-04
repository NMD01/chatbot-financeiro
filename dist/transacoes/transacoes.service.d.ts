import { Repository } from 'typeorm';
import { Transacao } from './entity/transacao.entity';
export declare class TransacoesService {
    private repo;
    constructor(repo: Repository<Transacao>);
    adicionar(usuario: string, valor: number, categoria: string, tipo: string): Promise<void>;
    resumo(usuario: string): Promise<string>;
}
