import { Injectable } from '@angular/core';
import { HttpEvent, HttpInterceptor, HttpHandler, HttpRequest } from '@angular/common/http';
import 'rxjs/add/operator/do';

import { Observable } from 'rxjs/Observable';

@Injectable()
export class IlgrigioClient implements HttpInterceptor {
    intercept(req: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>> {
        const newRequest = req.clone({
            headers: req.headers.set(
                'Authorization', 'eyJ0eXAiOiJKV1QiLCJhbGciOiJSUzI1NiIsImp0aSI6ImNiZjYxZmMyMGM4YjM5MzFhNjZjNDlkM2ZhMTEyNzVkNzhkNTliMDMwNDliYzljMGZjN2U5OTM4NGE0MzgxODRjM2M5N2RmMTZiZTc1NTRmIn0.eyJhdWQiOiIzIiwianRpIjoiY2JmNjFmYzIwYzhiMzkzMWE2NmM0OWQzZmExMTI3NWQ3OGQ1OWIwMzA0OWJjOWMwZmM3ZTk5Mzg0YTQzODE4NGMzYzk3ZGYxNmJlNzU1NGYiLCJpYXQiOjE1MTk0OTg0NzQsIm5iZiI6MTUxOTQ5ODQ3NCwiZXhwIjoxNTUxMDM0NDc0LCJzdWIiOiIxIiwic2NvcGVzIjpbXX0.BB940hFK9AoGmAP6rRwNGUhdP8dAFFUFjFfk8Qw01TQ05KW6HctE94YN7Cd71XKWEjrYXCSyLinOKV2UqQTiyHLGN8muH_tYu3FlH_NYXgrhl_x2VxekCVTfri-cc9mHQS9OdRWhusRZNl5ubd4-R1qXoroq48lK4e4j8dGAoh2Dn78VS3sR320QoVhO4qfUDndXPh-lq_VlrmT4wgvQT942JcN6v73r8V6_3X1Zacs36ZJsT_vW_y78MQHXjQg9reWuEXPf4Ni_yrvFdwJ28eql2RkBG30tUAIIoYXasrJoaPPYDeMaNdc_AzeexDnR45gA9SdU0sf6q6v-km1FHE2eXxOjBwOctjiPzN5dhWevXbpUmwQLjNrHI7gLXmR9nNrKprx7XDNsHkvI8omOF0fG2I0_mZeN6EVCi4YMwEDADGuHKyuLrcr9wW2ht145k9SKPe_wlspiJzggDcxkcwVSltNMClOGnPonscGYtjQc6vB0pdhGDtE56D-9rnX0LIEPOUStMc5A0wsm9dr_Fo6GoSpxT8-ntB17xv2rE9D_lGf_9MIuieYrg4gZTSnp9B23AoU65F61NpL_wGcISrWO-Xp180xgL695J5ZaI1u_GT95B0_w3g-bphHYrkqbpauKQwRxqLMBQ9nFG6dMFU2GqCY3oBt2E9bmCKqYcZ4'
            )
        });

        console.log(newRequest);

        return next.handle(newRequest).do(
            succ => console.log(succ),
            err => {
                if(err.status == 401) {
                    console.error("You are not authenticated!");
                }
            }
        );
    }
};