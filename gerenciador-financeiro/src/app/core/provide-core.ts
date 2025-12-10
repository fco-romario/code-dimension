import { makeEnvironmentProviders } from "@angular/core";
import { provideAuth } from "./auth/provide-auth";
import { provideHttpClient, withInterceptors } from "@angular/common/http";
import { MAT_SNACK_BAR_DEFAULT_OPTIONS, MatSnackBarConfig } from "@angular/material/snack-bar";
import { provideEnvironmentNgxMask } from "ngx-mask";
import { setOuthTokenInterceptor } from "./auth/interceptors/set-outh-token-interceptor";

export function provideCore() {
    return makeEnvironmentProviders([
        provideAuth(),
        provideHttpClient(withInterceptors([setOuthTokenInterceptor])),
        provideEnvironmentNgxMask(
        {
            thousandSeparator:".",
            decimalMarker:",",
        }),
        {
            provide: MAT_SNACK_BAR_DEFAULT_OPTIONS,
            useValue: {
                horizontalPosition: "center",
                verticalPosition: "top",
                duration: 3000
            } as MatSnackBarConfig
        },
    ]);
}