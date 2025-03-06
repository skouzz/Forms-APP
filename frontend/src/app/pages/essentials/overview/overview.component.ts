import { Component } from "@angular/core"
import { CommonModule } from "@angular/common"

@Component({
  selector: "app-overview",
  standalone: true,
  imports: [CommonModule],
  template: `
    <div class="overview-container">
      <div class="breadcrumbs">
        <span>Introduction</span>
        <span class="separator">›</span>
        <span class="current">Essentials</span>
      </div>
      
      <h1>Essentials</h1>
      
      <p class="intro">
        A short introduction to some of Angular's main concepts.
      </p>
      
      <div class="content-with-image">
        <div class="content">
          <h2>Interested in Angular?</h2>
          
          <p>
            Welcome! This Essentials guide explains some of Angular's main concepts, helping you understand what it's like to use the framework. This guide focuses on just a few building blocks as a short introduction. If you're looking for deep, comprehensive documentation, you can navigate to specific In-depth Guides from the documentation landing page.
          </p>
          
          <p>
            If you prefer to immediately start writing some code, you can skip straight to the hands-on tutorial.
          </p>
        </div>
        
        <div class="image">
          <img src="/placeholder.svg?height=200&width=200" alt="Angular concepts illustration" />
        </div>
      </div>
    </div>
  `,
  styles: [
    `
    .overview-container {
      max-width: 800px;
    }
    
    .breadcrumbs {
      display: flex;
      align-items: center;
      gap: 0.5rem;
      margin-bottom: 1rem;
      color: #6b7280;
      font-size: 14px;
    }
    
    .separator {
      color: #9ca3af;
    }
    
    .current {
      font-weight: 500;
    }
    
    h1 {
      font-size: 2.5rem;
      font-weight: 600;
      margin-bottom: 1rem;
      color: #111827;
    }
    
    .intro {
      font-size: 1.25rem;
      color: #4b5563;
      margin-bottom: 2rem;
    }
    
    .content-with-image {
      display: flex;
      gap: 2rem;
      align-items: flex-start;
    }
    
    .content {
      flex: 1;
    }
    
    h2 {
      font-size: 1.75rem;
      font-weight: 600;
      margin-bottom: 1rem;
      color: #111827;
    }
    
    p {
      margin-bottom: 1rem;
      line-height: 1.6;
      color: #4b5563;
    }
    
    .image {
      display: flex;
      justify-content: center;
      align-items: center;
    }
    
    @media (max-width: 768px) {
      .content-with-image {
        flex-direction: column;
      }
      
      .image {
        order: -1;
        margin-bottom: 1.5rem;
      }
    }
  `,
  ],
})
export class OverviewComponent {}

