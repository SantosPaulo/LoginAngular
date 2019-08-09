export class Helpers {

    static download(res: any, filename: string): void {
        
        const file = new Blob([res], {
          type: res.type
        });

        // IE only
        if (window.navigator && window.navigator.msSaveOrOpenBlob) {
          window.navigator.msSaveOrOpenBlob(file);
          return;
        }
    
        const blob = window.URL.createObjectURL(file);
    
        // set up link
        const link = document.createElement('a');
        link.download = filename;
        link.href = blob;
    
        // Firefox click event
        link.dispatchEvent(new MouseEvent('click', {
          bubbles: true,
          cancelable: true,
          view: window
        }));
    
        setTimeout(() => {
          window.URL.revokeObjectURL(blob);
          link.remove();
        }, 100);
    }
}
