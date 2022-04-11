export declare class ProjectVer {
    vers: Record<string, number>;
    private static inst;
    static getInst(): ProjectVer;
    private constructor();
    getVer(projetName: string): Promise<string | number>;
    incVer(projetName: string): Promise<void>;
    setVer(projectName: string, ver: number): Promise<void>;
}
