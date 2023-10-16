import { Controller, Get, Header, Sse } from '@nestjs/common';
import { Observable, Subscription, filter, interval, map, timer } from 'rxjs';
@Controller()
export class AppController {
  private shortCurrentProcess = 1;
  private canPushData = true;
  private shortTimer = timer(1000, 1000).pipe(
    filter((data) => data < 10 && data > 0),
  );
  private shortTimerSubscription: Subscription;

  @Header('Cache-Control', 'none')
  @Get('/api/short')
  shortPolling(): unknown {
    if (this.canPushData) {
      this.canPushData = false;
      return {
        value: this.shortCurrentProcess * 10,
        process: `当前的进度为${this.shortCurrentProcess * 10}%`,
      };
    } else {
      return {
        data: '暂无数据',
      };
    }
  }

  @Get('/api/start')
  startLoading() {
    this.stopLoading();
    this.shortTimerSubscription = this.shortTimer.subscribe(() => {
      ++this.shortCurrentProcess;
      this.canPushData = true;
    });
  }

  @Get('/api/stop')
  stopLoading() {
    this.shortTimerSubscription?.unsubscribe();
    this.shortCurrentProcess = 1;
    this.canPushData = true;
  }

  private longPollingCurrentProcess = 1;
  @Header('Cache-Control', 'none')
  @Get('/api/long')
  async longPolling() {
    if (this.longPollingCurrentProcess >= 10) {
      this.longPollingCurrentProcess = 1;
    }
    return await new Promise((resolve) => {
      timer(500).subscribe(() => {
        resolve({
          value: ++this.longPollingCurrentProcess * 10,
          process: `当前的进度为${this.longPollingCurrentProcess * 10}%`,
        });
      });
    });
  }

  @Sse('/api/sse')
  sse(): Observable<MessageEvent> {
    return interval(500).pipe(
      filter((data) => data <= 10 && data > 0),
      map((value) => {
        return {
          data: { process: `当前的进度为${value * 10}%`, value: value * 10 },
        } as MessageEvent;
      }),
    );
  }
}
