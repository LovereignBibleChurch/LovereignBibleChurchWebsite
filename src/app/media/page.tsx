import Hero from "@/components/home/Hero";
import {MediaheroData} from "@/data/heroData";
import StreamingPlatforms from "@/components/media/streamingPlatforms";
import SermonMessages from "@/components/media/SermonMessages";
import PhotoGallery from "@/components/media/photoGallery";
import { getSermons, getGalleryImages } from "@/sanity/lib/queries";
import { getAllGalleryImages } from "@/sanity/lib/bulkUploadUtils";
import BooksPromo from "@/components/home/BooksPromo";

export default async function Media() {
  // Fetch sermons from Sanity
  const sermons = await getSermons();
  // Use the new combined approach to get all gallery images
  const galleryImages = await getAllGalleryImages();

  return (
    <div className="">
        <Hero items={MediaheroData} />
        <StreamingPlatforms />
        <SermonMessages sermons={sermons} />
        <BooksPromo />
        <PhotoGallery galleryImages={galleryImages} />
    </div>
  )
}
