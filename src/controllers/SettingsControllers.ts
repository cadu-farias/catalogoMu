import { Anuncio } from "@/models/entities/Anuncio";
import { Banners } from "@/models/entities/Banners";
import { ISettingsControllers } from "./interfaces/ISettingsControllers";
import { IConfiguracoes } from "@/models/repository/interfaces/IConfiguracoes";

export class SettingsControllers implements ISettingsControllers{

    private static instance:ISettingsControllers | null = null
    private configuracoes: IConfiguracoes | null =  null

    private constructor(configuracoes:IConfiguracoes){
        this.configuracoes = configuracoes
    }

    static getInstance(configuracoes:IConfiguracoes){
        if(!SettingsControllers.instance){
            SettingsControllers.instance = new SettingsControllers(configuracoes)
        }
        return SettingsControllers.instance;
    }

    async createBanner(imgDesktop: string, imgMobile: string, ativo: boolean): Promise<Banners> {
        if (!this.configuracoes) {
            throw new Error("Configurações não definidas. Não é possível criar um banner.");
        }
        return await this.configuracoes.createBanner(imgDesktop,imgMobile,ativo)
    }
    async readBanner(updateCallback: (banners:Banners[]) => void): Promise<void> {
        if (!this.configuracoes) {
            throw new Error("Configurações não definidas. Não é possível criar um banner.");
        }
        this.configuracoes.readBanner(updateCallback)
    }
    async editBanner(id: string, imgDesktop: string, imgMobile: string, ativo: boolean): Promise<void> {
        if (!this.configuracoes) {
            throw new Error("Configurações não definidas. Não é possível criar um banner.");
        }
        await this.configuracoes.editBanner(id,imgDesktop,imgMobile,ativo)
    }
    async deleteBanner(id: string): Promise<void> {
        if (!this.configuracoes) {
            throw new Error("Configurações não definidas. Não é possível criar um banner.");
        }
        await this.configuracoes.deleteBanner(id)
    }
    pararEscutadorBanner(): void {
        if (!this.configuracoes) {
            throw new Error("Configurações não definidas. Não é possível criar um banner.");
        }
        this.configuracoes.stopListening()
    }
    async createAnuncio(img: string, ativo: boolean): Promise<Anuncio> {
        if (!this.configuracoes) {
            throw new Error("Configurações não definidas. Não é possível criar um banner.");
        }
        return await this.configuracoes.createAnuncio(img,ativo)
    }
    async readAnuncio(updateCallback: (anuncios:Anuncio[]) => void): Promise<void> {
        if (!this.configuracoes) {
            throw new Error("Configurações não definidas. Não é possível criar um banner.");
        }
        await this.configuracoes.readAnuncio(updateCallback)
    }
    async editAnuncio(id: string, img: string, ativo: boolean): Promise<void> {
        if (!this.configuracoes) {
            throw new Error("Configurações não definidas. Não é possível criar um banner.");
        }
        await this.configuracoes.editAnuncio(id,img,ativo)
    }
    async deleteAnuncio(id: string): Promise<void> {
        if (!this.configuracoes) {
            throw new Error("Configurações não definidas. Não é possível criar um banner.");
        }
        await this.configuracoes.deleteAnuncio(id)
    }

    pararEscutadorAnuncio(): void {
        this.configuracoes?.stopListeningAnuncio()
    }

}