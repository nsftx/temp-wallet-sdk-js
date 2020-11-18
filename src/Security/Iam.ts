import { IamClient } from './IamClient';
import { IamClientOptions } from './Interfaces';
import { ResponseErrorMessage } from '../Common/ResponseErrorMessage';

export class Iam {
  private client: IamClient;

  constructor(clientOptions: IamClientOptions) {
    this.client = new IamClient(clientOptions);
  }

  public async authorize(tenantUuid: string, token: string): Promise<object> {
    try {
      const result = await this.client.get('/v1/authorization/rbac/authorize', {
        params: {
          _format: 'json',
          token,
          resolveStrategy: 'AND',
          platformAccount: tenantUuid,
          roles: ['SevenIAM:ListAccessKeys'],
          includeDescendantPlatformAccounts: false,
        },
      });

      return result.data;
    } catch (error) {
      return new ResponseErrorMessage(error.response);
    }
  }

  public async validateToken(tenantUuid: string, token: string): Promise<object> {
    const result = await this.authorize(tenantUuid, token);
    return result;
  }
}
