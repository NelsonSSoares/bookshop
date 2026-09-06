import { Book } from './book.model';
import { LibraryUser } from './library-user.model';

export interface Purchase {
  id: number;
  libraryUser: LibraryUser;
  book: Book;
  purchaseTimestamp: string;
}
