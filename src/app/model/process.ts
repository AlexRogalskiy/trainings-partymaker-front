export class Process {
  constructor(
    public id?: string,
    public key?: string,
    public category?: string,
    public description?: string,
    public name?: string,
    public version?: number,
    public resource?: string,
    public deploymentId?: string,
    public diagram?: string,
    public suspended?: boolean,
    public tenantId?: string,
    public versionTag?: string,
    public historyTimeToLive?: number,
    public startableInTasklist?: boolean,
  ) {
  }
}
