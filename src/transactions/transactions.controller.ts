import { Body, Controller, Get, Param, Post, Query, Req } from '@nestjs/common';
import { User } from 'users/entities/user.entity';
import { GasPriceRequest, GasPriceResponse } from './dto/gasPrice.dto';
import { TransactionRequest, TransactionResponse } from './dto/transacction.dto';
import { Transaction } from './entities/transaction.entity';
import { TransactionsService } from './transactions.service';

@Controller('transactions')
export class TransactionsController {
  constructor(private transactionsService: TransactionsService) {}

  @Get('fee')
  async getGasPrice(@Query() body: GasPriceRequest, @Req() request): Promise<GasPriceResponse> {
    return await this.transactionsService.getGasPrice(body, request?.user);
  }

  @Post('/')
  async transaction(
    @Body() body: TransactionRequest,
    @Req() request,
  ): Promise<TransactionResponse> {
    return await this.transactionsService.transaction(body, request?.user);
  }

  @Get('/')
  async getUserTransactions(@Req() request): Promise<Array<Partial<Transaction>>> {
    return await this.transactionsService.getUserTransactions(request?.user);
  }
}
