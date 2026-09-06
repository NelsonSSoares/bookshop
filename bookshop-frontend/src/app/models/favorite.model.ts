import { Book } from './book.model';
import { LibraryUser } from './library-user.model';

export interface Favorite {
  id: number;
  libraryUser: LibraryUser;
  book: Book;
}
