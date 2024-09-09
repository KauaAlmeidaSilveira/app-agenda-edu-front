import { NgModule } from "@angular/core";

import { MatListModule } from '@angular/material/list';
import { MatDividerModule } from '@angular/material/divider';

import { MatInputModule } from '@angular/material/input';
import { MatFormFieldModule } from '@angular/material/form-field';

import { MatDatepickerModule } from '@angular/material/datepicker';
import { MatNativeDateModule } from '@angular/material/core';
import { MatSelectModule } from '@angular/material/select';
import { MatButtonModule } from '@angular/material/button';
import { MatTableModule } from '@angular/material/table';
import { MatDialogModule } from "@angular/material/dialog";

@NgModule({
    imports: [
        MatListModule,
        MatDividerModule,
        MatInputModule,
        MatFormFieldModule,
        MatDatepickerModule,
        MatNativeDateModule,
        MatSelectModule,
        MatButtonModule,
        MatTableModule,
		MatDialogModule
    ],
    exports: [
        MatListModule,
        MatDividerModule,
        MatInputModule,
        MatFormFieldModule,
        MatDatepickerModule,
        MatNativeDateModule,
        MatSelectModule,
        MatButtonModule,
        MatTableModule,
		MatDialogModule
    ]
})
export class AngularMaterialModule {}
