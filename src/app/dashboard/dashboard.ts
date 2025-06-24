// src/app/dashboard/dashboard.component.ts
import { Component, OnInit } from '@angular/core';
import { LlmService } from '../services/llm';
import { MatDialog } from '@angular/material/dialog';
import { AddLlmDialogComponent } from '../add-llm-dialog/add-llm-dialog';
import { LLM } from '../models/llm.model';
import { CommonModule } from '@angular/common';
import { MatButtonModule } from '@angular/material/button';
import { MatIconModule } from '@angular/material/icon';
import { MatTableModule } from '@angular/material/table';
import { MatToolbarModule } from '@angular/material/toolbar';

@Component({
  selector: 'app-dashboard',
  standalone: true,
  imports: [
    CommonModule,
    MatButtonModule,
    MatIconModule,
    MatTableModule,
    MatToolbarModule
  ],
  templateUrl: './dashboard.html',
  styleUrls: ['./dashboard.scss']
})
export class DashboardComponent implements OnInit {
  llms: LLM[] = [];
  displayedColumns: string[] = ['name', 'version', 'actions'];

  constructor(
    private llmService: LlmService,
    private dialog: MatDialog
  ) {}

  ngOnInit(): void {
    this.loadLLMs();
  }

  loadLLMs(): void {
    this.llmService.getLLMs().subscribe((llms) => {
      this.llms = llms;
    });
  }

  openAddDialog(): void {
    const dialogRef = this.dialog.open(AddLlmDialogComponent, {
      width: '500px',
      panelClass: 'dark-dialog'
    });

    dialogRef.afterClosed().subscribe(result => {
      if (result) {
        this.llmService.addLLM(result).subscribe(() => {
          this.loadLLMs();
        });
      } else {
        alert("Failed to add a new LLM!")
      }
    });
  }

  removeLLM(id: string): void {
    this.llmService.removeLLM(id).subscribe(() => {
      this.loadLLMs();
    });
  }

  launchAll(): void {
    this.llmService.launchAllLLMs();
  }
}