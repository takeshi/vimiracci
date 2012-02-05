package sample.photos;

import java.io.File;
import java.net.URL;

import com.google.gdata.client.photos.PicasawebService;
import com.google.gdata.data.PlainTextConstruct;
import com.google.gdata.data.media.MediaFileSource;
import com.google.gdata.data.photos.PhotoEntry;
import com.google.gdata.util.AuthenticationException;

public class Main {

	public static void main(String[] args) throws AuthenticationException,
			Exception {
		PicasawebService service = new PicasawebService("sample");

		service.setUserCredentials("konkicci", "morte197");
		URL albumPostUrl = new URL(
				"https://picasaweb.google.com/data/feed/api/user/konkicci/albumid/default");

		PhotoEntry myPhoto = new PhotoEntry();
		myPhoto.setTitle(new PlainTextConstruct("Puppies FTW"));
		myPhoto.setDescription(new PlainTextConstruct(
				"Puppies are the greatest."));
		myPhoto.setClient("myClientName");

		MediaFileSource myMedia = new MediaFileSource(new File(
				"/Users/takeshikondo/Desktop/s3tree.png"), "image/png");
		myPhoto.setMediaSource(myMedia);

		PhotoEntry returnedPhoto = service.insert(albumPostUrl, myPhoto);
		System.out.println(returnedPhoto.getHtmlLink().getHref());
		for (com.google.gdata.data.Link link : returnedPhoto.getLinks()) {
			System.out.println(link.getHref());
		}
		System.out.println(returnedPhoto.getContent());
	}
}
